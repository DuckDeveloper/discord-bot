import {Message} from 'discord.js'
import {AudioPlayer, joinVoiceChannel} from '@discordjs/voice'

import {GuildId} from '@root/types'

type CreateChannelConnection = (req: Message, audioPlayer: AudioPlayer, guildId: GuildId) => void

const createChannelConnection: CreateChannelConnection = (req, audioPlayer, guildId) => {
    const voiceChannel = req.member.voice.channel

    const connection = joinVoiceChannel({
        channelId: voiceChannel.id,
        guildId: guildId,
        adapterCreator: voiceChannel.guild.voiceAdapterCreator,
    })
    connection.subscribe(audioPlayer)
}

export default createChannelConnection
