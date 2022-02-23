import {ButtonInteraction, Client, Intents, Interaction, Message, MessageInteraction} from 'discord.js'

import {GuildsListForAudio} from "@root/classes/audio";

import AudioCommands from '@root/commands/audio'
import AudioInteractions from '@root/interactions/audio'

import {token} from '@root/config'
import EventObserver from "@root/classes/common/EventObserver";
import PlayerEmbed from "@root/classes/audio/PlayerEmbed";

const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_VOICE_STATES,
    ],
})

const guildsListForAudio = new GuildsListForAudio()
const interactionObserver = new EventObserver()
const playerEmbed = new PlayerEmbed()

client.on('ready', () => console.log('Bot has been started...'))
client.on('message', (req: Message) => AudioCommands(
    req,
    {
        guildsListForAudio,
        interactionObserver,
        playerEmbed,
    }
))
client.on('interactionCreate', (req: ButtonInteraction) => AudioInteractions(
    req,
    {
        guildsListForAudio,
        interactionObserver,
    }
))

client.login(token)