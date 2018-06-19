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

    getWonNumber(): number {
        return this.state.getWonNumber()
    }

    getWonNumberText(): string {
        return this.state.getWonNumber().toString()
    }

    getPlayer(): number {
        return this.state.getPlayer()
    }

    private setUpEvents() {
        this.emitter.on(GameEvents.playBtn.clicked, this.onPlayBtnClick, this)
        this.emitter.on(GameEvents.pawn.moveFinished, this.state.changePlayer, this.state)
        this.emitter.on(GameEvents.pawn.clicked, this.onPawnSelect, this)
    }

    private onPawnSelect(pawnIndex): void {
        this.state.movePawn(pawnIndex)
    }

    private onPlayBtnClick(): void {
        this.state.drawNumber()
    }

}
