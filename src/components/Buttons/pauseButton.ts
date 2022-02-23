import {MessageButton} from 'discord.js'
import {InteractionButtonsCustomIdList} from '@root/interactions/audio/InteractionButtonsCustomIdList'

const pauseButton = () => new MessageButton()
    .setCustomId(InteractionButtonsCustomIdList.pause)
    .setLabel('Pause ⏸')
    .setStyle('SECONDARY')

export default pauseButton()