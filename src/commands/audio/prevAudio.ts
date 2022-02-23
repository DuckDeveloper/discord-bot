import {getAudioResource} from '@root/modules/audio'
import {AudioPlayer} from '@discordjs/voice'

import {GuildId} from '@root/types'
import GuildsListForAudio from '@root/classes/audio/GuildsListForAudio'

type PrevAudio = (guildId: GuildId, guildsListForAudio: GuildsListForAudio) => void

const prevAudio: PrevAudio = async (guildId, guildsListForAudio) => {
    const isFailed = guildsListForAudio.setPrevCurrentHistoryIndex(guildId)

    if (isFailed) {
        return
    }

    const {currentHistoryIndex, audioHistoryIdList} = guildsListForAudio.guildsList[guildId]
    const resource = await getAudioResource(audioHistoryIdList[currentHistoryIndex])

    const guild = guildsListForAudio.guildsList[guildId]

    guild.audioPlayer.play(resource)
}

export default prevAudio