import {Message} from 'discord.js'

import {GuildsListForAudio} from '@root/classes/audio'

import playAudio from './playAudio'
import stopAudio from './stopAudio'
import pauseAudio from './pauseAudio'
import unpauseAudio from './unpauseAudio'
import nextAudio from './nextAudio'
import prevAudio from './prevAudio'

import {messageIsNotValid, getArgsAndCommand, toCapitalize} from '@root/helpers'
import {GuildId} from '@root/types'

type AudioCommands = (req: Message, guildsListForAudio: GuildsListForAudio) => Promise<void>

const AudioCommands: AudioCommands = async (req, guildsListForAudio) => {
    if (messageIsNotValid(req)) {
        return
    }

    const {args, command} = getArgsAndCommand(req)

    const guildId: GuildId | undefined = req.member.voice.channel?.guildId
    if (!guildId) {
        req.channel.send(`${toCapitalize(req.author.username)}, подключитесь к каналу...`)

        return
    }

    guildsListForAudio.initGuild(guildId)
    const guild = guildsListForAudio.guildsList[guildId]

    switch (command) {
        case 'play':
            await playAudio(req, {args, guildId, guildsListForAudio})

            guild.playerUserInterface.init(req)
            await guild.playerUserInterface.createPlayer()

            return
        case 'pause':
            pauseAudio(guild.audioPlayer)
            guild.playerUserInterface.togglePause()

            break
        case 'unpause':
            unpauseAudio(guild.audioPlayer)
            guild.playerUserInterface.togglePause()

            break
        case 'stop':
            stopAudio(guildId, guildsListForAudio)

            return
        case 'next':
            await nextAudio(guildId, guildsListForAudio)

            break
        case 'prev':
            await prevAudio(guildId, guildsListForAudio)

            break
        default:
            return
    }
    await guild.playerUserInterface.updatePlayerUserInterface()
}

export default AudioCommands