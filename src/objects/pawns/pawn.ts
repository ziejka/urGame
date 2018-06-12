import AbstractPawnConfig from './abstractPawnConfig';

export default class Pawn extends Phaser.GameObjects.Sprite {
    positions: Phaser.Geom.Point[]
    currenPosition: number;

    private tweenMoveList: Phaser.Tweens.TweenConfigDefaults[]

    constructor(scene: Phaser.Scene, { positions, texture }: AbstractPawnConfig, firstPosition: Phaser.Geom.Point) {
        super(scene, firstPosition.x, firstPosition.y, texture)
        this.positions = positions
        this.currenPosition = 0
        this.setInteractive()
        this.tweenMoveList = this.createMoveTweens()
        this.scene = scene
        this.setScale(0.8)

        this.on('pointerup', () => {
            this.movePawnBy(4)
            this.setScale(1)
        })
    }

    movePawnBy(n: number) {
        const tweenTimeline = this.scene.tweens.timeline({})
        let nextPos = this.currenPosition + n
        for (let i = this.currenPosition + 1; i < nextPos + 1; i++) {
            if (i > 17) {
                nextPos = 17
                tweenTimeline.add(this.tweenMoveList[17])
                break;
            }
            tweenTimeline.add(this.tweenMoveList[i])
        }
        tweenTimeline.play()
        this.currenPosition = nextPos
    }

    private createMoveTweens(): Phaser.Tweens.TweenConfigDefaults[] {
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
        console.log(tweenMoveList);

        return tweenMoveList
    }
}
