import GameUtils from "../../utils/GameUtils";
import AbstractPawnConfig from './abstractPawnConfig';

export default class Pawn extends Phaser.GameObjects.Sprite {
    positions: Phaser.Geom.Point[]
    currenPosition: number;

    private tweenMoveList: Phaser.Tweens.TweenConfigDefaults[]
    private tweenTimeline: Phaser.Tweens.Timeline

    constructor(scene: Phaser.Scene, { positions, texture }: AbstractPawnConfig) {
        super(scene, positions[1].x, positions[1].y, texture)
        this.positions = positions
        this.currenPosition = 1
        this.setInteractive()
        this.tweenMoveList = this.createMoveTweens(scene)
        this.tweenTimeline = scene.tweens.timeline({})
        this.scene = scene

        this.on('pointerup', () => {
            this.jumpToPosition(4)
        })
    }

    jumpToPosition(n: number) {
        const tweenTimeline = this.scene.tweens.timeline({})
        let nextPos = this.currenPosition + n
        for (let i = this.currenPosition; i < nextPos; i++) {
            if (i > 17) {
                nextPos = 0
                tweenTimeline.add(this.tweenMoveList[nextPos])
                break;
            }
            tweenTimeline.add(this.tweenMoveList[i])
        }
        tweenTimeline.play()
        this.currenPosition = nextPos
    }

    private createMoveTweens(scene: Phaser.Scene): Phaser.Tweens.TweenConfigDefaults[] {
        let tweenMoveList: Phaser.Tweens.TweenConfigDefaults[] = []
        for (let i = 0; i < this.positions.length; i++) {
            const config = {
                targets: this,
                x: this.positions[i].x,
                y: this.positions[i].y,
                duration: 150,
                paused: true,
                ease: 'inOut'
            }
            tweenMoveList.push(config)
        }
        return tweenMoveList
    }
}
