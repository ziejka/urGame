import GameUtils from "../../utils/GameUtils";
import AbstractPawnConfig from './abstractPawnConfig';
import { Events } from 'phaser';

export default class Pawn extends Phaser.GameObjects.Sprite {
    positions: Phaser.Geom.Point[]
    currenPosition: number;

    constructor(scene: Phaser.Scene, { positions, texture }: AbstractPawnConfig) {
        super(scene, positions[1].x, positions[1].y, texture)
        this.positions = positions
        this.currenPosition = 1
        this.setInteractive()

        this.on('pointerup', () => {
            if (this.currenPosition === 17) {
                this.currenPosition = 0
            } else {
                this.currenPosition++
            }

            this.jumpToPosition(this.currenPosition)
        })
    }

    jumpToPosition(n: number) {
        this.setPosition(this.positions[n].x, this.positions[n].y)
    }
}
