import {AudioPlayer} from '@discordjs/voice'

import { destroyChannelConnection } from '@root/modules/common'

import {GuildId} from '@root/types'
import GuildsListForAudio from '@root/classes/audio/GuildsListForAudio'

type StopAudio = (guildId: GuildId, guildsListForAudio: GuildsListForAudio) => void

const stopAudio: StopAudio = (guildId, guildsListForAudio) => {
	const guild = guildsListForAudio.guildsList[guildId]

	guild.audioPlayer.stop()
	destroyChannelConnection(guildId)
	guildsListForAudio.deleteGuildIdList(guildId)
}

export default stopAudio