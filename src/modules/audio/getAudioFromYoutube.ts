import fetch from 'node-fetch'

import {buildUrlStringByQueryParams} from '@root/helpers'

import {YOUTUBE_API_KEY, YOUTUBE_API_URL, MAX_AUDIO_ID_LIST_LENGTH} from '@root/config'

import {AudioId} from '@root/types'

interface Data {
    items: [
        {
            id: {
                videoId: AudioId
            }
        }
    ]
    error?: string
}

type GetAudioFromYoutube = (searchQuery: string) => Promise<Data | false>

const getAudioFromYoutube: GetAudioFromYoutube = async (searchQuery) => {
    if (!searchQuery) {
        return
    }

    const queryParams = {
        part: 'snippet',
        key: YOUTUBE_API_KEY,
        type: 'video',
        order: 'viewCount',
        maxResults: MAX_AUDIO_ID_LIST_LENGTH,
        q: searchQuery,
    }

    const isShuffle = !!Math.round(Math.random())

    const response = await fetch(buildUrlStringByQueryParams(YOUTUBE_API_URL, queryParams))
    const data: Data = await response.json()

    if (data.error) {
        console.error(data)
        return false
    }

    if (isShuffle) {
        data.items = data.items.sort(() => Math.random() - Math.random())
    }

    return data
}

export default getAudioFromYoutube