import { Colors, Font, GameEvents } from '../../config/config';
import { iClientGameLogic } from '../../gameLogic/iClientGameLogic';

const minSpinNumber = 5

export default class BtnContainer extends Phaser.GameObjects.Container {
    private numbers: Phaser.GameObjects.Sprite[];
    private centerX: number;
    private playBtn: Phaser.GameObjects.Sprite;
    private wonValue: Phaser.GameObjects.Text;
    private xOffset: number = 100
    private gameLogic: iClientGameLogic;
    private emitter: Phaser.Events.EventEmitter;

    constructor(scene: Phaser.Scene, centerPoint: Phaser.Geom.Point, gameLogic: iClientGameLogic, emitter: Phaser.Events.EventEmitter) {
        super(scene)
        let btnMask = scene.make.image({ key: 'btnMask', add: false, x: 0, y: 0 }),
            positionX: number = centerPoint.x + 5,
            positionY: number = centerPoint.y * 2 - btnMask.height / 2 + 3,
            hitArea = new Phaser.Geom.Circle(positionX, positionY, 55)

        this.gameLogic = gameLogic
        this.emitter = emitter
        this.centerX = centerPoint.x
        this.playBtn = scene.add.sprite(positionX, positionY, 'playRed')
        this.wonValue = this.createWonValueText(scene, positionY)
        this.numbers = this.generateNumbers(scene, centerPoint.x, positionY)
        this.add(this.playBtn)

        btnMask.setPosition(this.centerX, positionY)
        this.mask = btnMask.createBitmapMask()

        this.setInteractive(hitArea, Phaser.Geom.Circle.Contains)
        this.on('pointerup', () => {
            this.onBtnClick()
        })
    }

    public onBtnClick(): void {
        this.emitter.emit(GameEvents.playBtn.animationFinished)
        this.scene.add.tween({
            targets: this.playBtn,
            x: this.centerX - this.xOffset,
            duration: 200,
            onComplete: this.runSpinNumber.bind(this, 0)
        })
    }

    private endSpinAnimation(): void {
        this.wonValue.setText(this.gameLogic.getWonNumberText())
        this.wonValue.setX(this.centerX + this.xOffset)
        this.scene.add.tween({
            targets: this.wonValue,
            x: this.centerX,
            duration: 200,
            onComplete: this.onEndSpinAnimationComplete.bind(this)
        })
    }

    private onEndSpinAnimationComplete(): void {
        setTimeout(() => {
            this.scene.add.tween({
                targets: this.wonValue,
                x: this.centerX - this.xOffset,
                duration: 200
            })

            this.playBtn.setX(this.centerX + this.xOffset)
            this.scene.add.tween({
                targets: this.playBtn,
                x: this.centerX,
                duration: 200
            })
        }, 1000);
    }

    private runSpinNumber(num: number) {
        let index = Math.floor(Math.random() * 5),
            target: Phaser.GameObjects.Sprite = this.numbers[index],
            callback: Function

        if (num > minSpinNumber) {
            callback = this.endSpinAnimation.bind(this)
        } else {
            callback = this.runSpinNumber.bind(this, ++num)
        }

        target.setX(this.centerX + this.xOffset)
        this.scene.add.tween({
            targets: target,
            x: this.centerX - this.xOffset,
            duration: 150,
            onComplete: callback
        })
    }

    private createWonValueText(scene: Phaser.Scene, positionY: number): Phaser.GameObjects.Text {
        let text = scene.add.text(this.centerX + this.xOffset, positionY, '0', { font: Font.fontNormal, color: Colors.Red })
        text.setShadow(2, 2, Colors.Shadow, 3, false, true)
        text.setOrigin(0.5, 0.5)
        this.add(text)

        return text
    }

    private generateNumbers(scene: Phaser.Scene, positionX: number, positionY: number): Phaser.GameObjects.Sprite[] {
        let redNumbers = []

        for (let index = 0; index < 5; index++) {
            const sprite = scene.add.sprite(positionX + this.xOffset, positionY, `blurRed${index}`)
            this.add(sprite)
            redNumbers.push(sprite)
        }
        return redNumbers
    }
}
