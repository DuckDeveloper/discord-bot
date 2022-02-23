import {getHoursFromMilliseconds} from '@root/helpers'

import {GuildForAudio} from '@root/classes/audio'
import {GuildId} from '@root/types'
import GuildsListForAudio from '@root/classes/audio/GuildsListForAudio'

type DeleteAbandonedGuilds = (guildsListForAudio: GuildsListForAudio) => void

const deleteAbandonedGuild: DeleteAbandonedGuilds = (guildsListForAudio) => {
    Object.entries(guildsListForAudio.guildsList).forEach(([guildId, guild]: [GuildId, GuildForAudio]) => {
        const nowDate = new Date()
        const dateDifference = +nowDate - +guild.lastUpdateDate

        if (getHoursFromMilliseconds(dateDifference) >= 24) {
            guildsListForAudio.deleteGuild(guildId)
        }
    })
    const timeoutTime = 1000 * 60 * 60 * 3

    setTimeout(() => deleteAbandonedGuild(guildsListForAudio), timeoutTime)
}

export default deleteAbandonedGuild