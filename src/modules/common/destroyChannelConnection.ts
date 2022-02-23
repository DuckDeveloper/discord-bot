import {getVoiceConnection} from '@discordjs/voice'

import {GuildId} from '@root/types'

type DestroyChannelConnection = (guildId: GuildId) => void

const destroyChannelConnection: DestroyChannelConnection = (guildId) => {
    if (!guildId) {
        return
    }

    const connection = getVoiceConnection(guildId)
    connection?.destroy()
}

export default destroyChannelConnection