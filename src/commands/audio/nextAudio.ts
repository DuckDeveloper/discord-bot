import {getAudioResource} from '@root/modules/audio'

import {GuildId} from '@root/types'
import GuildsListForAudio from '@root/classes/audio/GuildsListForAudio'

type NextAudio = (guildId: GuildId, guildsListForAudio: GuildsListForAudio) => Promise<void>

const nextAudio: NextAudio = async (guildId, guildsListForAudio) => {
    const isFailed = guildsListForAudio.setNextCurrentHistoryIndex(guildId)

    if (isFailed) {
        return
    }

    const {currentHistoryIndex, audioHistoryIdList} = guildsListForAudio.guildsList[guildId]
    const resource = await getAudioResource(audioHistoryIdList[currentHistoryIndex])

    const guild = guildsListForAudio.guildsList[guildId]

    guild.audioPlayer.play(resource)
}

export default nextAudio