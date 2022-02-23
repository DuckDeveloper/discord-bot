import {AudioPlayerStatus, createAudioPlayer} from '@discordjs/voice'

import PlayerUserInterface from './PlayerUserInterface'

import nextAudio from '@root/commands/audio/nextAudio'

import {filterObjectByKeys} from '@root/helpers'

import {MAX_AUDIO_HISTORY_ID_LIST_LENGTH, MAX_AUDIO_ID_LIST_LENGTH} from '@root/config'

import {GuildId, AudioId} from '@root/types'
import {GuildsList} from './types'

class GuildsListForAudio {
    guildsList: GuildsList

    constructor(guildsList?: GuildsList) {
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
            playerUserInterface: new PlayerUserInterface(),
            lastUpdateDate: new Date(),
        }

        this.setHandlersOnAudioPlayer(guildId)
    }

    private setHandlersOnAudioPlayer(guildId: GuildId) {
        const guild = this.guildsList[guildId]

        guild.audioPlayer.on(AudioPlayerStatus.Idle, async () => {
            await nextAudio(guildId, this)
        })
    }

    addAudioIdList(guildId: GuildId, guildAudioIdList: AudioId[]): void {
        this.setNewLastUpdateDate(guildId)

        const guild = this.guildsList[guildId]

        this.guildsList[guildId] = {
            ...guild,
            currentAudioIndex: 0,
            guildAudioIdList,
        }

        this.addAudioIdToHistory(guildId, guildAudioIdList[0])

        this.checkButtonsIsDisabled(guildId)
    }

    private addAudioIdToHistory(guildId: GuildId, audioId: AudioId): void {
        this.setNewLastUpdateDate(guildId)

        const guild = this.guildsList[guildId]
        const {audioHistoryIdList, currentHistoryIndex, currentAudioIndex} = guild

        const prevAudioHistoryIdList = audioHistoryIdList || []
        if (prevAudioHistoryIdList.length === MAX_AUDIO_HISTORY_ID_LIST_LENGTH) {
            prevAudioHistoryIdList.shift()
        }

        this.guildsList[guildId] = {
            ...guild,
            currentHistoryIndex: currentHistoryIndex || 0,
            currentAudioIndex: currentAudioIndex || 0,
            audioHistoryIdList: [...prevAudioHistoryIdList, audioId],
        }
    }

    private setNextCurrentAudioIndex(guildId: GuildId): true | void {
        const guild = this.guildsList[guildId]
        const {currentAudioIndex} = guild

        if (currentAudioIndex === MAX_AUDIO_ID_LIST_LENGTH - 1) {
            return true
        }

        this.guildsList[guildId] = {
            ...guild,
            currentAudioIndex: currentAudioIndex + 1,
        }

        this.checkButtonsIsDisabled(guildId)
    }

    setNextCurrentHistoryIndex(guildId: GuildId): true | void {
        this.setNewLastUpdateDate(guildId)

        {
            const guild = this.guildsList[guildId]
            const {
                currentHistoryIndex,
                audioHistoryIdList,
                guildAudioIdList
            } = guild

            if (currentHistoryIndex === audioHistoryIdList.length - 1) {
                const isFailed = this.setNextCurrentAudioIndex(guildId)

                if (isFailed) {
                    return true
                }
            }

            const {currentAudioIndex} = this.guildsList[guildId]

            this.addAudioIdToHistory(guildId, guildAudioIdList[currentAudioIndex])
        }

        const guild = this.guildsList[guildId]
        const {currentHistoryIndex} = guild

        const nextHistoryIndex = currentHistoryIndex === MAX_AUDIO_HISTORY_ID_LIST_LENGTH - 1
            ? currentHistoryIndex
            : currentHistoryIndex + 1

        this.guildsList[guildId] = {
            ...guild,
            currentHistoryIndex: nextHistoryIndex,
        }

        this.checkButtonsIsDisabled(guildId)
    }

    setPrevCurrentHistoryIndex(guildId: GuildId): true | void {
        this.setNewLastUpdateDate(guildId)

        const guild = this.guildsList[guildId]
        const {currentHistoryIndex} = guild

        if (currentHistoryIndex === 0) {
            return true
        }

        this.guildsList[guildId] = {
            ...guild,
            currentHistoryIndex: currentHistoryIndex - 1,
        }

        this.checkButtonsIsDisabled(guildId)
    }

    deleteGuild(guildId: GuildId): void {
        this.guildsList = <GuildsList>filterObjectByKeys(this.guildsList, guildId)
    }

    private setNewLastUpdateDate(guildId: GuildId): void {
        const guild = this.guildsList[guildId]

        this.guildsList[guildId] = {
            ...guild,
            lastUpdateDate: new Date(),
        }
    }

    private checkButtonsIsDisabled(guildId: GuildId): void {
        const guild = this.guildsList[guildId]

        const {
            playerUserInterface,
            currentAudioIndex,
            currentHistoryIndex,
            audioHistoryIdList,
        } = guild

        const nextButtonIsDisabled = currentAudioIndex === MAX_AUDIO_ID_LIST_LENGTH - 1
            && currentHistoryIndex === audioHistoryIdList.length - 1

        const prevButtonIsDisabled = currentHistoryIndex === 0

        playerUserInterface.setDisableNextButton(nextButtonIsDisabled)
        playerUserInterface.setDisablePrevButton(prevButtonIsDisabled)
    }
}

export default GuildsListForAudio