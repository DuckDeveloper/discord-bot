import {MessageButton} from 'discord.js'
import {InteractionButtonsCustomIdList} from '@root/interactions/audio/InteractionButtonsCustomIdList'

const unpauseButton = () => new MessageButton()
    .setCustomId(InteractionButtonsCustomIdList.unpause)
    .setLabel('Unpause')
    .setStyle('PRIMARY')

export default unpauseButton()