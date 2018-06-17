import GameState from './gameState';
import { GameEvents } from '../config/config';
import { iClientGameLogic } from './iClientGameLogic';

export default class GameLogic implements iClientGameLogic {
    private state: GameState;
    private emitter: Phaser.Events.EventEmitter;

    constructor(emitter: Phaser.Events.EventEmitter) {
        this.emitter = emitter
        this.state = new GameState()
        this.emitter.on(GameEvents.playBtn.animationFinished, this.onPlayBtnClick, this)
    }

    private onPlayBtnClick(): void {
        this.state.drawNumber()
    }

    getWonNumberText(): string {
        return this.state.getWonNumber().toString()
    }
}
