import { AudioPlayer } from '@discordjs/voice'


type UnpauseAudio = (audioPlayer: AudioPlayer) => void

const unpauseAudio: UnpauseAudio = audioPlayer => {
	audioPlayer.unpause()
}

export default unpauseAudio