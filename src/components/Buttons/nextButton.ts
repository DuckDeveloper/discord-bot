import {MessageButton} from 'discord.js'
import {InteractionButtonsCustomIdList} from '@root/interactions/audio/InteractionButtonsCustomIdList'

const nextButton = () => new MessageButton()
    .setCustomId(InteractionButtonsCustomIdList.next)
    .setLabel('Next')
    .setStyle('PRIMARY')

export default nextButton()