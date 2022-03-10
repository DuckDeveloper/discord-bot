// import {token, YOUTUBE_API_KEYS} from './private'
import 'dotenv/config'

const token = process.env.token
const YOUTUBE_API_KEYS = JSON.parse(process.env.YOUTUBE_API_KEYS)
console.log(process.env.PORT)
const prefix = '!'
const YOUTUBE_URL = 'https://youtube.com/embed'
const YOUTUBE_API_URL = 'https://www.googleapis.com/youtube/v3/search'
const MAX_AUDIO_ID_LIST_LENGTH = 50
const MAX_AUDIO_HISTORY_ID_LIST_LENGTH = 15


export {
    token,
    prefix,
    YOUTUBE_URL,
    YOUTUBE_API_URL,
    YOUTUBE_API_KEYS,
    MAX_AUDIO_ID_LIST_LENGTH,
    MAX_AUDIO_HISTORY_ID_LIST_LENGTH,
}