import {ButtonInteraction} from 'discord.js'

type InteractionIsNotValid = (interaction: ButtonInteraction) => boolean

const interactionIsNotValid: InteractionIsNotValid = (interaction) => !interaction.isButton()

export default interactionIsNotValid