import {AudioPlayer} from '@discordjs/voice'

type PauseAudio = (audioPlayer: AudioPlayer) => void

const pauseAudio: PauseAudio = audioPlayer => {
    audioPlayer.pause()
}

export default pauseAudio