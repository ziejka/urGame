import GameUtils from "../../utils/GameUtils";
import AbstractPawnConfig from './abstractPawnConfig';

export default class Pawn extends Phaser.GameObjects.Sprite {
    positions: Phaser.Geom.Point[]

    constructor(scene: Phaser.Scene, { positions, texture }: AbstractPawnConfig) {
        super(scene, positions[0].x, positions[0].y, texture)
        this.positions = positions
        window['pawn'] = this
    }

    jumpToPosition(n: number) {
        this.setPosition(this.positions[n].x, this.positions[n].y)
    }
}
