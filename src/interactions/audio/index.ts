import {ButtonInteraction} from 'discord.js'

import {GuildsListForAudio} from "@root/classes/audio";
import EventObserver from "@root/classes/common/EventObserver";

import {interactionIsNotValid} from '@root/helpers'

import {InteractionButtonsCustomIdList} from "./InteractionButtonsCustomIdList";

import {GuildId} from "@root/types";
import nextAudio from "@root/commands/audio/nextAudio";
import prevAudio from "@root/commands/audio/prevAudio";
import pauseAudio from "@root/commands/audio/pauseAudio";
import unpauseAudio from '@root/commands/audio/unpauseAudio';
import stopAudio from "@root/commands/audio/stopAudio";

interface Params {
    guildsListForAudio: GuildsListForAudio,
    interactionObserver: EventObserver,
}

type AudioInteractions = (interaction: ButtonInteraction, params: Params) => void

const AudioInteractions: AudioInteractions = async (interaction, {guildsListForAudio, interactionObserver}) => {
    if (interactionIsNotValid(interaction)) {
        return
    }
    const guildId: GuildId | undefined = interaction.guildId

    const guild = guildsListForAudio.guildsList[guildId]
    if (!guild) {
        return interaction.channel.send('Бот не запущен...')
    }

    switch (interaction.customId) {
        case InteractionButtonsCustomIdList.next:
            nextAudio(guildId, guildsListForAudio)

            break
        case InteractionButtonsCustomIdList.prev:
            prevAudio(guildId, guildsListForAudio)

            break
        case InteractionButtonsCustomIdList.pause:
            pauseAudio(guild.audioPlayer)

            interactionObserver.broadcast()
            break
        case InteractionButtonsCustomIdList.unpause:
            unpauseAudio(guild.audioPlayer)

            break
        case InteractionButtonsCustomIdList.stop:
            stopAudio(guildId, guildsListForAudio)

            break
        default:
    }
}

export default AudioInteractions