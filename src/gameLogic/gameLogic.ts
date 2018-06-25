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
        window['l'] = this
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

    getAvailableMoves(): number[] {
        return this.state.getAvailableMoves()
    }

    getPawnToKill(): number[] {
        return this.state.getPawnToKill()
    }

    getScore(): number[] {
        return this.state.getScore()
    }

    private setUpEvents() {
        this.emitter.on(GameEvents.playBtn.clicked, this.onPlayBtnClick, this)
        this.emitter.on(GameEvents.pawn.moveFinished, this.state.changePlayer, this.state)
        this.emitter.on(GameEvents.pawn.selected, this.onPawnSelected, this)
    }

    private onPawnSelected(pawnIndex): void {
        this.state.movePawn(pawnIndex)
    }

    private onPlayBtnClick(): void {
        this.state.drawStep()
    }

}
