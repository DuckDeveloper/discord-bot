import {Message} from 'discord.js'

import {GuildsListForAudio} from '@root/classes/audio'
import EventObserver from "@root/classes/common/EventObserver";

import playAudio from './playAudio'
import stopAudio from './stopAudio'
import pauseAudio from './pauseAudio'
import unpauseAudio from './unpauseAudio'
import nextAudio from './nextAudio'
import prevAudio from './prevAudio'

import {messageIsNotValid, getArgsAndCommand, toCapitalize} from '@root/helpers'
import {GuildId} from "@root/types";
import PlayerEmbed from "@root/classes/audio/PlayerEmbed";

interface Params {
    guildsListForAudio: GuildsListForAudio,
    interactionObserver: EventObserver,
    playerEmbed: PlayerEmbed,
}

type AudioCommands = (req: Message, params: Params) => void

const AudioCommands: AudioCommands = (req, {guildsListForAudio, interactionObserver, playerEmbed}) => {
    if (messageIsNotValid(req)) {
        return
    }

    const {args, command} = getArgsAndCommand(req)

    const guildId: GuildId | undefined = req.member.voice.channel?.guildId
    if (!guildId) {
        return req.channel.send(`${toCapitalize(req.author.username)}, подключитесь к каналу...`)
    }

    guildsListForAudio.initGuild(guildId)
    const guild = guildsListForAudio.guildsList[guildId]

    switch (command) {
        case 'play':
            playerEmbed.initRequest(req)

            playAudio(req, {args, guildId, guildsListForAudio})
            playerEmbed.createPlayer()
            interactionObserver.subscribe(playerEmbed.editPlayer.bind(playerEmbed))

            break
        case 'pause':
            pauseAudio(guild.audioPlayer)

            break
        case 'unpause':
            unpauseAudio(guild.audioPlayer)

            break
        case 'stop':
            stopAudio(guildId, guildsListForAudio)

            break
        case 'next':
            nextAudio(guildId, guildsListForAudio)

            break
        case 'prev':
            prevAudio(guildId, guildsListForAudio)

            break
        default:
            return
    }
}

export default AudioCommands