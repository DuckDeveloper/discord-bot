import {Message, MessageActionRow} from "discord.js";
import {nextButton, pauseButton, prevButton, stopButton, unpauseButton} from "@root/components/Buttons";

class PlayerEmbed {
    req: Message


    initRequest(req: Message) {
        this.req = this.req || req
    }

    async createPlayer(): Promise<void> {
        await this.req.re(this.createPlayerEmbed())

    }

    async editPlayer(): Promise<void> {
        await this.req.reply(this.createPausedPlayerEmbed())
    }

    private createPlayerEmbed(): { components: MessageActionRow[] } {
        const buttonsRow = new MessageActionRow()
            .addComponents(
                nextButton,
                prevButton,
                pauseButton,
                stopButton,
            );

        return {components: [buttonsRow]}
    }

    private createPausedPlayerEmbed(): { components: MessageActionRow[] } {
        const buttonsRow = new MessageActionRow()
            .addComponents(
                nextButton,
                prevButton,
                unpauseButton,
                stopButton,
            );

        return {components: [buttonsRow]}
    }
}

export default PlayerEmbed