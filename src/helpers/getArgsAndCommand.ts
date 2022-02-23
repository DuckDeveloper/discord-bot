import {Message} from 'discord.js/typings'

import {prefix} from '@root/config'

type GetArgsAndCommandFromReq = (req: Message) => {
    args: string[],
    command: string
}

const getArgsAndCommandFromReq: GetArgsAndCommandFromReq = req => {
    const args = req.content.slice(prefix.length).split(' ')
    const command = args.shift()

    return {args, command}
}

export default getArgsAndCommandFromReq
