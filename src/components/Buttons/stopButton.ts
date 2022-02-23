import {MessageButton} from 'discord.js'
import {InteractionButtonsCustomIdList} from '@root/interactions/audio/InteractionButtonsCustomIdList'

const stopButton = () => new MessageButton()
    .setCustomId(InteractionButtonsCustomIdList.stop)
    .setLabel('Stop')
    .setStyle('PRIMARY')

export default stopButton()