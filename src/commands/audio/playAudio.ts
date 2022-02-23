import {Message} from 'discord.js'

import {createChannelConnection} from '@root/modules/common'
import {getAudioResource, getAudioFromYoutube} from '@root/modules/audio'

import {GuildId} from '@root/types'
import GuildsListForAudio from '@root/classes/audio/GuildsListForAudio'

interface Params {
    args: string[]
    guildId: GuildId
    guildsListForAudio: GuildsListForAudio
}

type PlayAudio = (req: Message, params: Params) => Promise<void>

const playAudio: PlayAudio = async (req, {args, guildId, guildsListForAudio}) => {
    if (!args.length) {
        return
    }

    const guild = guildsListForAudio.guildsList[guildId]

    createChannelConnection(req, guild.audioPlayer, guildId)

    const {items: audioIdList} = await getAudioFromYoutube(args.join(' ')) || {}

    if (!audioIdList) {
        req.channel.send('Случилось что-то непредвиденное...')

        return
    }

    guildsListForAudio.addAudioIdList(guildId, audioIdList.map(item => item.id.videoId))

    const audioId = audioIdList[0].id.videoId
    const resource = await getAudioResource(audioId)
    guild.audioPlayer.play(resource)
}

export default playAudio