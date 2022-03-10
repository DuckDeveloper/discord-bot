import fetch from 'node-fetch'

import {buildUrlStringByQueryParams} from '@root/helpers'

import {YOUTUBE_API_KEYS, YOUTUBE_API_URL, MAX_AUDIO_ID_LIST_LENGTH} from '@root/config'

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

    let apiKeyIndex = 0
    let fetchIterateCount = 0
    const MAX_FETCH_ITERATE_COUNT = 2

    const fetchYoutubeAPI = async () => {
        const queryParams = {
            part: 'snippet',
            key: YOUTUBE_API_KEYS[apiKeyIndex],
            type: 'video',
            order: 'viewCount',
            maxResults: MAX_AUDIO_ID_LIST_LENGTH,
            q: searchQuery,
        }
        console.log(buildUrlStringByQueryParams(YOUTUBE_API_URL, queryParams))
        const response = await fetch(buildUrlStringByQueryParams(YOUTUBE_API_URL, queryParams))
        const data: Data = await response.json()

        if (data.error) {
            if (!apiKeyIndex) {
                console.error(data)
            }
            apiKeyIndex++

            if (apiKeyIndex === YOUTUBE_API_KEYS.length) {
                apiKeyIndex = 0
                fetchIterateCount++
            }

            if (fetchIterateCount === MAX_FETCH_ITERATE_COUNT) {
                return false
            }

            return fetchYoutubeAPI()
        }

        return data
    }

    const data = await fetchYoutubeAPI()

    const isShuffle = !!Math.round(Math.random())

    if (isShuffle && data) {
        data.items = data.items.sort(() => Math.random() - Math.random())
    }

    return data
}

export default getAudioFromYoutube