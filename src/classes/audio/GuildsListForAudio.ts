import {AudioPlayerStatus, createAudioPlayer} from '@discordjs/voice'

import nextAudio from "@root/commands/audio/nextAudio";

import {filterObjectByKeys} from '@root/helpers'

import {MAX_AUDIO_HISTORY_ID_LIST_LENGTH, MAX_AUDIO_ID_LIST_LENGTH} from '@root/config'

import {GuildId, AudioId} from '@root/types'
import {GuildsList} from './types'

class GuildsListForAudio {
    guildsList: GuildsList

    constructor(guildsList?) {
        this.guildsList = guildsList || {}
    }

    initGuild(guildId: GuildId) {
        if (this.guildsList[guildId]) {
            return
        }

        this.guildsList[guildId] = {
            currentHistoryIndex: 0,
            currentAudioIndex: 0,
            audioHistoryIdList: [],
            guildAudioIdList: [],
            audioPlayer: createAudioPlayer(),
            lastUpdateDate: new Date(),
        }

        this.setHandlersOnAudioPlayer(guildId)
    }

    private setHandlersOnAudioPlayer(guildId: GuildId) {
        const guild = this.guildsList[guildId]

        guild.audioPlayer.on(AudioPlayerStatus.Idle, () => {
            nextAudio(guildId, this)
        })
    }

    addAudioIdList(guildId: GuildId, guildAudioIdList: AudioId[]): void {
        this.setNewLastUpdateDate(guildId)

        const guildParams = this.guildsList[guildId]

        this.guildsList[guildId] = {
            ...guildParams,
            currentAudioIndex: 0,
            guildAudioIdList,
        }

        this.addAudioIdToHistory(guildId, guildAudioIdList[0])
    }

    private addAudioIdToHistory(guildId: GuildId, audioId: AudioId): void {
        this.setNewLastUpdateDate(guildId)

        const guildParams = this.guildsList[guildId]
        const {audioHistoryIdList, currentHistoryIndex, currentAudioIndex} = guildParams

        const prevAudioHistoryIdList = audioHistoryIdList || []
        if (prevAudioHistoryIdList.length === MAX_AUDIO_HISTORY_ID_LIST_LENGTH) {
            prevAudioHistoryIdList.shift()
        }

        this.guildsList[guildId] = {
            ...guildParams,
            currentHistoryIndex: currentHistoryIndex || 0,
            currentAudioIndex: currentAudioIndex || 0,
            audioHistoryIdList: [...prevAudioHistoryIdList, audioId],
        }
    }

    private setNextCurrentAudioIndex(guildId: GuildId): true | void {
        const guildParams = this.guildsList[guildId]
        const {currentAudioIndex} = guildParams

        if (currentAudioIndex === MAX_AUDIO_ID_LIST_LENGTH - 1) {
            return true
        }

        this.guildsList[guildId] = {
            ...guildParams,
            currentAudioIndex: currentAudioIndex + 1,
        }
    }

    setNextCurrentHistoryIndex(guildId: GuildId): true | void {
        this.setNewLastUpdateDate(guildId)

        {
            const guildParams = this.guildsList[guildId]
            const {
                currentHistoryIndex,
                audioHistoryIdList,
                currentAudioIndex: prevAudioIndex,
                guildAudioIdList
            } = guildParams

            let isFailed

            if (currentHistoryIndex === audioHistoryIdList.length - 1) {
                isFailed = this.setNextCurrentAudioIndex(guildId)
            }

            const {currentAudioIndex} = this.guildsList[guildId]

            if (currentAudioIndex !== prevAudioIndex) {
                this.addAudioIdToHistory(guildId, guildAudioIdList[currentAudioIndex])
            }

            if (isFailed) {
                return true
            }
        }

        const guildParams = this.guildsList[guildId]
        const {currentHistoryIndex} = guildParams

        const nextHistoryIndex = currentHistoryIndex === MAX_AUDIO_HISTORY_ID_LIST_LENGTH - 1
            ? currentHistoryIndex
            : currentHistoryIndex + 1

        this.guildsList[guildId] = {
            ...guildParams,
            currentHistoryIndex: nextHistoryIndex,
        }
    }

    setPrevCurrentHistoryIndex(guildId: GuildId): true | void {
        this.setNewLastUpdateDate(guildId)

        const guildParams = this.guildsList[guildId]
        const {currentHistoryIndex} = guildParams

        if (currentHistoryIndex === 0) {
            return true
        }

        this.guildsList[guildId] = {
            ...guildParams,
            currentHistoryIndex: currentHistoryIndex - 1,
        }
    }

    deleteGuildIdList(guildId: GuildId): void {
        this.guildsList = <GuildsList>filterObjectByKeys(this.guildsList, guildId)
    }

    private setNewLastUpdateDate(guildId: GuildId): void {
        const guildParams = this.guildsList[guildId]

        this.guildsList[guildId] = {
            ...guildParams,
            lastUpdateDate: new Date(),
        }
    }
}

export default GuildsListForAudio