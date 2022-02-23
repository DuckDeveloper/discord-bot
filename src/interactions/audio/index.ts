import {ButtonInteraction} from 'discord.js'

import {GuildsListForAudio} from '@root/classes/audio'

import {interactionIsNotValid} from '@root/helpers'

import {InteractionButtonsCustomIdList} from './InteractionButtonsCustomIdList'

import {GuildId} from '@root/types'
import nextAudio from '@root/commands/audio/nextAudio'
import prevAudio from '@root/commands/audio/prevAudio'
import pauseAudio from '@root/commands/audio/pauseAudio'
import unpauseAudio from '@root/commands/audio/unpauseAudio'
import stopAudio from '@root/commands/audio/stopAudio'

type AudioInteractions = (interaction: ButtonInteraction, guildsListForAudio: GuildsListForAudio) => Promise<void>

const AudioInteractions: AudioInteractions = async (interaction, guildsListForAudio) => {
    if (interactionIsNotValid(interaction)) {
        return
    }

    const guildId: GuildId | undefined = interaction.guildId

    const guild = guildsListForAudio.guildsList[guildId]
    if (!guild) {
        interaction.channel.send('Бот не запущен...')

        return
    }

    switch (interaction.customId) {
        case InteractionButtonsCustomIdList.next:
            await nextAudio(guildId, guildsListForAudio)

            break
        case InteractionButtonsCustomIdList.prev:
            await prevAudio(guildId, guildsListForAudio)

            break
        case InteractionButtonsCustomIdList.pause:
            pauseAudio(guild.audioPlayer)
            guild.playerUserInterface.togglePause()

            break
        case InteractionButtonsCustomIdList.unpause:
            unpauseAudio(guild.audioPlayer)
            guild.playerUserInterface.togglePause()

            break
        case InteractionButtonsCustomIdList.stop:
            stopAudio(guildId, guildsListForAudio)

            return
        default:
    }

    await guild.playerUserInterface.updatePlayerUserInterface()
}

export default AudioInteractions