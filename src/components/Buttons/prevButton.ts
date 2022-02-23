import {MessageButton} from 'discord.js'
import {InteractionButtonsCustomIdList} from '@root/interactions/audio/InteractionButtonsCustomIdList'

const prevButton = () => new MessageButton()
    .setCustomId(InteractionButtonsCustomIdList.prev)
    .setLabel('Prev')
    .setStyle('PRIMARY')

export default prevButton()