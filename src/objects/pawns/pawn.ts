import AbstractPawnConfig from './abstractPawnConfig';
import { GameEvents } from '../../config/config';

export default class Pawn extends Phaser.GameObjects.Sprite {
    private positions: Phaser.Geom.Point[]
    private currenPosition: number
    private tweenMoveList: Phaser.Tweens.TweenConfigDefaults[]
    private jumpAnim: string
    private sceneEvents: Phaser.Events.EventEmitter
    private id: number;
    private enableTween: Phaser.Tweens.Tween;

    constructor(scene: Phaser.Scene, { positions, texture, animation }: AbstractPawnConfig, firstPosition: Phaser.Geom.Point, id: number) {
        super(scene, firstPosition.x, firstPosition.y, texture)
        this.id = id
        this.positions = positions
        this.currenPosition = 0
        this.tweenMoveList = this.createMoveTweens()
        this.scene = scene
        this.enableTween = this.createEnableTween()
        this.sceneEvents = scene.events
        this.setScale(0.8)
        this.jumpAnim = animation

        scene.add.existing(this)

        this.on('pointerup', this.onPawnClicked, this)
    }

    private onPawnClicked(): void {
        this.disable()
        this.sceneEvents.emit(GameEvents.pawn.selected, this.id)
    }

    public disable(): void {
        if (!this.enableTween.paused) {
            this.enableTween.pause()
        }
        this.removeInteractive()
    }

    public enable(): void {
        this.enableTween.resume()
        this.setInteractive()
    }

    public moveToPosition(newPos: number): void {
        const tweenTimeline = this.scene.tweens.timeline({})
        let steps = newPos - this.currenPosition,
            nextPos = this.currenPosition + steps
        this.setScale(1)
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
        this.sceneEvents.emit(GameEvents.pawn.moveFinished)
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

    private createEnableTween(): Phaser.Tweens.Tween {
        return this.enableTween = this.scene.add.tween({
            targets: this,
            repeat: -1,
            scaleX: 0.9,
            scaleY: 0.9,
            yoyo: true,
            duration: 300,
            paused: true
        })
    }
}
