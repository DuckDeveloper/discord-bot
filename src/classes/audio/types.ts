import {AudioPlayer} from '@discordjs/voice'

import PlayerUserInterface from './PlayerUserInterface'

import {AudioId, HistoryIndex, GuildAudioIndex, GuildId} from '@root/types'
import {MessageActionRow} from 'discord.js'

export interface GuildForAudio {
    currentHistoryIndex: HistoryIndex,
    currentAudioIndex: GuildAudioIndex,
    audioHistoryIdList: AudioId[],
    guildAudioIdList: AudioId[],
    audioPlayer: AudioPlayer,
    playerUserInterface: PlayerUserInterface,
    lastUpdateDate: Date,
}

export interface GuildsList {
    [key: GuildId]: GuildForAudio
}

export interface PlayerEmbed {
    components: MessageActionRow[]
}