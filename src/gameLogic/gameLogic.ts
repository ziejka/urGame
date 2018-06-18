import GameState from './gameState';
import { GameEvents } from '../config/config';
import iClientGameLogic from './iClientGameLogic';

export default class GameLogic implements iClientGameLogic {
    private state: GameState;
    private emitter: Phaser.Events.EventEmitter;

    constructor(emitter: Phaser.Events.EventEmitter) {
        this.emitter = emitter
        this.state = new GameState()
        this.setUpEvents()
    }

    private setUpEvents() {
        this.emitter.on(GameEvents.playBtn.clicked, this.onPlayBtnClick, this)
        this.emitter.on(GameEvents.pawn.moveFinished, this.state.changePlayer, this.state)
    }

    private onPlayBtnClick(): void {
        this.state.drawNumber()
    }

    getWonNumberText(): string {
        return this.state.getWonNumber().toString()
    }

    getPlayer(): number {
        return this.state.getPlayer()
    }
}
