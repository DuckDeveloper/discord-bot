import {AudioResource, createAudioResource} from '@discordjs/voice'
import play from 'play-dl'

import { YOUTUBE_URL } from '@root/config'

import {AudioId} from '@root/types'

type GetAudioResource = (audioId: AudioId) => Promise<AudioResource>

const getAudioResource: GetAudioResource = async audioId => {
	const stream = await play.stream(`${ YOUTUBE_URL }/${ audioId }`)

	return createAudioResource(stream.stream, {
		inputType: stream.type,
	})
}

export default getAudioResource