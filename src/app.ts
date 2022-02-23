import {ButtonInteraction, Client, Intents, Message} from 'discord.js'

import {GuildsListForAudio} from '@root/classes/audio'

import AudioCommands from '@root/commands/audio'
import AudioInteractions from '@root/interactions/audio'

import {token} from '@root/config'
import {destroyChannelConnection, deleteAbandonedGuilds} from '@root/modules/common'

const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_VOICE_STATES,
    ],
})

const guildsListForAudio = new GuildsListForAudio()

deleteAbandonedGuilds(guildsListForAudio)

client.on('ready', () => console.log('Bot has been started...'))

client.on('voiceStateUpdate', nextState => {
    if (!nextState.guild.me.voice.channelId) {
        const guildId = nextState.guild.id
        const guild = guildsListForAudio.guildsList[guildId]

        if (guildId) {
            destroyChannelConnection(guildId)
        }

        guild?.playerUserInterface.deletePlayer()
        guild?.audioPlayer.stop()
    }
})

client.on('messageCreate', (req: Message) => AudioCommands(
    req,
    guildsListForAudio,
))

client.on('interactionCreate', (req: ButtonInteraction) => AudioInteractions(
    req,
    guildsListForAudio,
))

client.login(token)