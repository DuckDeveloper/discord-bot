import {Message} from 'discord.js'

import {prefix} from '@root/config'

type MessageIsNotValid = (req: Message) => boolean

const messageIsNotValid: MessageIsNotValid = ({author, content}) => (
    author.bot || !content.startsWith(prefix)
)

export default messageIsNotValid