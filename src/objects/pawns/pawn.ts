import AbstractPawnConfig from './abstractPawnConfig';
import { RIGHT } from 'phaser';

export default class Pawn extends Phaser.GameObjects.Sprite {
    positions: Phaser.Geom.Point[]
    currenPosition: number;

    private tweenMoveList: Phaser.Tweens.TweenConfigDefaults[]
    private jumpAnim: string;

    constructor(scene: Phaser.Scene, { positions, texture, animation }: AbstractPawnConfig, firstPosition: Phaser.Geom.Point) {
        super(scene, firstPosition.x, firstPosition.y, texture)
        this.positions = positions
        this.currenPosition = 0
        this.setInteractive()
        this.tweenMoveList = this.createMoveTweens()
        this.scene = scene
        this.setScale(0.8)
        this.jumpAnim = animation

        scene.add.existing(this)

        this.on('pointerup', () => {
            this.movePawnBy(1)
            this.setScale(1)
        })
    }

    movePawnBy(n: number) {
        const tweenTimeline = this.scene.tweens.timeline({
            onComplete: this.stopJump.bind(this),
            onStart: this.playJump.bind(this)
        })
        let nextPos = this.currenPosition + n
        for (let i = this.currenPosition + 1; i < nextPos + 1; i++) {
            if (i > 17) {
                nextPos = 17
                tweenTimeline.add(this.tweenMoveList[17])
                break;
            }
            tweenTimeline.add(this.tweenMoveList[i])
        }
        tweenTimeline.setCallback('onStart', this.playJump, null, this)
        tweenTimeline.setCallback('onComplete', this.stopJump, null, this)
        tweenTimeline.play()
        this.currenPosition = nextPos
    }

    private playJump(): void {
        this.disableInteractive()
        this.anims.play(this.jumpAnim)
    }

    private stopJump(): void {
        this.setInteractive()
        this.anims.restart()
        this.anims.stop()
    }

    private createMoveTweens(): Phaser.Tweens.TweenConfigDefaults[] {
        let tweenMoveList: Phaser.Tweens.TweenConfigDefaults[] = []
        for (let i = 0; i < this.positions.length; i++) {
            const config = {
                targets: this,
                x: this.positions[i].x,
                y: this.positions[i].y,
                duration: 200,
                delay: 200,
                hold: 300,
                paused: true,
                ease: 'inOut'
            }
            tweenMoveList.push(config)
        }
        return tweenMoveList
    }
}
