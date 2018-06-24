import Arrows from "./arrows";
import ArrowsFactory from "./arrowsFactory";
import { GameEvents } from '../../config/config';

const players: number[] = [0, 1]

export default class ArrowsContainer extends Phaser.GameObjects.Container {
    private arrows: Arrows[];
    private activePlayer: number = -1;

    constructor(scene: Phaser.Scene, tilesPositions: Phaser.Geom.Point[]) {
        super(scene)
        this.arrows = players.map(pIndex => {
            const playerArrows = ArrowsFactory.createArrows(scene, tilesPositions, pIndex)
            playerArrows.getArrows().forEach(sprite => this.add(sprite))
            return playerArrows
        })

        scene.events.on(GameEvents.pawn.enabled, this.onSpinBtnEnd, this)
        scene.events.on(GameEvents.pawn.moveFinished, this.onPawnMoveFinished, this)
    }

    private onSpinBtnEnd(playerIndex: number): void {
        this.activePlayer = playerIndex
        this.arrows[playerIndex].playAnimation()
    }

    private onPawnMoveFinished(): void {
        if (this.activePlayer === -1) { return }
        this.arrows[this.activePlayer].pauseAnimation()
    }
}
