import { Colors, Font, GameEvents, Players } from '../../config/config';
import iClientGameLogic from '../../gameLogic/iClientGameLogic';

const minSpinNumber = 2

export default class PlayBtnContainer extends Phaser.GameObjects.Container {
    private numbers: Phaser.GameObjects.Sprite[][];
    private centerX: number;
    private centerY: number;
    private playBtns: Phaser.GameObjects.Sprite[];
    private wonValue: Phaser.GameObjects.Text;
    private offset: number = 100
    private gameLogic: iClientGameLogic;
    private emitter: Phaser.Events.EventEmitter;
    private playersColors: string[] = [Colors.Blue, Colors.Red]

    constructor(scene: Phaser.Scene, centerPoint: Phaser.Geom.Point, gameLogic: iClientGameLogic, emitter: Phaser.Events.EventEmitter) {
        super(scene)
        let btnMask = scene.make.image({ key: 'btnMask', add: false, x: 0, y: 0 }),
            positionX: number = centerPoint.x + 5,
            positionY: number = centerPoint.y * 2 - btnMask.height / 2 + 3,
            hitArea = new Phaser.Geom.Circle(positionX, positionY, 55)

        this.gameLogic = gameLogic
        this.emitter = emitter
        this.centerX = centerPoint.x
        this.centerY = positionY
        this.playBtns = this.createPlayBtns(scene, positionX, positionY)
        this.wonValue = this.createWonValueText(scene, positionY)
        this.numbers = this.generateNumbers(scene, centerPoint.x, positionY)

        btnMask.setPosition(this.centerX, positionY)
        this.mask = btnMask.createBitmapMask()

        this.setInteractive(hitArea, Phaser.Geom.Circle.Contains)
        this.on('pointerup', () => {
            this.onBtnClick()
        })
    }

    public onBtnClick(): void {
        this.emitter.emit(GameEvents.playBtn.clicked)
        this.scene.add.tween({
            targets: this.playBtns[this.gameLogic.getPlayer()],
            x: this.centerX - this.offset,
            duration: 200,
            onComplete: this.runSpinNumber.bind(this, 0)
        })
    }

    private endSpinAnimation(): void {
        this.wonValue.setText(this.gameLogic.getWonNumberText())
        this.wonValue.setPosition(this.centerX + this.offset, this.centerY)
        this.wonValue.setColor(this.playersColors[this.gameLogic.getPlayer()])
        this.scene.add.tween({
            targets: this.wonValue,
            x: this.centerX,
            duration: 200,
            onComplete: this.onEndSpinAnimationComplete.bind(this)
        })
    }

    private onEndSpinAnimationComplete(): void {
        this.emitter.emit(GameEvents.pawn.moveFinished)
        setTimeout(() => {
            this.scene.add.tween({
                targets: this.wonValue,
                y: this.centerY + this.offset,
                duration: 200
            })

            this.playBtns[this.gameLogic.getPlayer()].setPosition(this.centerX, this.centerY - this.offset)
            this.scene.add.tween({
                targets: this.playBtns[this.gameLogic.getPlayer()],
                y: this.centerY,
                duration: 200
            })
        }, 1000);
    }

    private runSpinNumber(num: number) {
        let index = Math.floor(Math.random() * 5),
            target: Phaser.GameObjects.Sprite = this.numbers[this.gameLogic.getPlayer()][index],
            callback: Function

        if (num > minSpinNumber) {
            callback = this.endSpinAnimation.bind(this)
        } else {
            callback = this.runSpinNumber.bind(this, ++num)
        }

        target.setX(this.centerX + this.offset)
        this.scene.add.tween({
            targets: target,
            x: this.centerX - this.offset,
            duration: 150,
            onComplete: callback
        })
    }

    private createWonValueText(scene: Phaser.Scene, positionY: number): Phaser.GameObjects.Text {
        let text = scene.add.text(this.centerX + this.offset, positionY, '0', { font: Font.fontNormal, color: Colors.Red })
        text.setShadow(2, 2, Colors.Shadow, 3, false, true)
        text.setOrigin(0.5, 0.5)
        this.add(text)

        return text
    }

    private generateNumbers(scene: Phaser.Scene, positionX: number, positionY: number): Phaser.GameObjects.Sprite[][] {
        let redNumbers: number[] = [0, 1]
        return redNumbers.map(playerIndex => {
            let sprites: Phaser.GameObjects.Sprite[] = []

            for (let index = 0; index < 5; index++) {
                const sprite = scene.add.sprite(positionX + this.offset, positionY, `blur${Players[playerIndex]}${index}`)
                this.add(sprite)
                sprites.push(sprite)
            }
            return sprites
        })
    }

    private createPlayBtns(scene: Phaser.Scene, positionX: number, positionY: number) {
        let btns = [
            scene.add.sprite(positionX, positionY, 'playBlue'),
            scene.add.sprite(positionX, positionY - this.offset, 'playRed')
        ]
        btns.forEach(s => this.add(s))

        return btns
    }
}
