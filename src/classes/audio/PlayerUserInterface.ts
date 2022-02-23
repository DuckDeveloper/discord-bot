import {Message, MessageActionRow, MessageButton} from 'discord.js'
import {nextButton, pauseButton, prevButton, stopButton, unpauseButton} from '@root/components/Buttons'

import {PlayerEmbed} from './types'

class PlayerUserInterface {
    private req: Message
    private playerUserInterface: Message | null
    private playerIsPaused: boolean
    private nextButtonIsDisabled: boolean
    private prevButtonIsDisabled: boolean


    init(req: Message) {
        this.req = this.req || req
        this.playerIsPaused = false
    }

    async createPlayer(): Promise<void> {
        await this.deletePlayer()

        this.playerUserInterface = await this.req.channel.send(this.getPlayerEmbedWithPauseButton())
    }

    setDisableNextButton(isDisabled): void {
        this.nextButtonIsDisabled = isDisabled
    }

    setDisablePrevButton(isDisabled): void {
        this.prevButtonIsDisabled = isDisabled
    }

    togglePause(): void {
        this.playerIsPaused = !this.playerIsPaused
    }

    async updatePlayerUserInterface(): Promise<void> {
        await this.deletePlayer()

        this.playerUserInterface = await this.req.channel.send(
            this.playerIsPaused
                ? this.getPlayerEmbedWithUnpauseButton()
                : this.getPlayerEmbedWithPauseButton()
        )
    }

    async deletePlayer(): Promise<void> {
        await this.playerUserInterface?.delete().catch(console.error)
        this.playerUserInterface = null
    }

    private getPlayerEmbedWithPauseButton(): PlayerEmbed {
        return this.getPlayerEmbed(
            [
                prevButton
                    .setDisabled(this.playerIsPaused || this.prevButtonIsDisabled),
                pauseButton,
                nextButton
                    .setDisabled(this.playerIsPaused || this.nextButtonIsDisabled),
                stopButton
            ]
        )
    }

    private getPlayerEmbedWithUnpauseButton(): PlayerEmbed {
        return this.getPlayerEmbed(
            [
                prevButton
                    .setDisabled(this.playerIsPaused || this.prevButtonIsDisabled),
                unpauseButton,
                nextButton
                    .setDisabled(this.playerIsPaused || this.nextButtonIsDisabled),
                stopButton
            ]
        )
    }

    private getPlayerEmbed(components: MessageButton[]): PlayerEmbed {
        const buttonsRow = new MessageActionRow()
            .addComponents(
                ...components
            )

        return {components: [buttonsRow]}
    }
}

export default PlayerUserInterface