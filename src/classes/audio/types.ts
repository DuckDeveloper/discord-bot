import {AudioPlayer} from "@discordjs/voice";

import {AudioId, HistoryIndex, GuildAudioIndex, GuildId} from '@root/types'

export interface GuildForAudio {
    currentHistoryIndex: HistoryIndex,
    currentAudioIndex: GuildAudioIndex,
    audioHistoryIdList: AudioId[],
    guildAudioIdList: AudioId[],
    audioPlayer: AudioPlayer,
    lastUpdateDate: Date,
}

export interface GuildsList {
    [key: GuildId]: GuildForAudio
}