import { Colors, Font, GameEvents, Players } from '../../config/config';
import iClientGameLogic from '../../gameLogic/iClientGameLogic';

const minSpinNumber = 2

export default class PlayBtnContainer extends Phaser.GameObjects.Container {
    private numbers: Phaser.GameObjects.Sprite[][]
    private centerX: number
    private centerY: number
    private playBtns: Phaser.GameObjects.Sprite[]
    private wonValue: Phaser.GameObjects.Text
    private offset: number = 100
    private gameLogic: iClientGameLogic
    private playersColors: string[] = [Colors.Blue, Colors.Red]
    private sceneEvents: Phaser.Events.EventEmitter
    private hitArea: Phaser.Geom.Circle;

    constructor(scene: Phaser.Scene, centerPoint: Phaser.Geom.Point, gameLogic: iClientGameLogic) {
        super(scene)
        let btnMask = scene.make.image({ key: 'btnMask', add: false, x: 0, y: 0 }),
            positionX: number = centerPoint.x + 5,
            positionY: number = centerPoint.y * 2 - btnMask.height / 2 + 3

        this.hitArea = new Phaser.Geom.Circle(positionX, positionY, 55)
        this.sceneEvents = scene.events
        this.gameLogic = gameLogic
        this.centerX = centerPoint.x
        this.centerY = positionY

        this.playBtns = this.createPlayBtns(scene, positionX, positionY)
        this.wonValue = this.createWonValueText(scene, positionY)
        this.numbers = this.generateNumbers(scene, centerPoint.x, positionY)

        btnMask.setPosition(this.centerX, positionY)
        this.mask = btnMask.createBitmapMask()

        this.setUpEvents()
        this.enable()
    }

    private enable(): void {
        this.setInteractive(this.hitArea, Phaser.Geom.Circle.Contains)
    }

    private setUpEvents(): void {
        this.on('pointerup', this.onBtnClick)
        this.sceneEvents.on(GameEvents.pawn.moveFinished, this.onPawnMoveEnd, this)
    }

    public onBtnClick(): void {
        this.disableInteractive()
        this.sceneEvents.emit(GameEvents.playBtn.clicked)
        this.scene.add.tween({
            targets: this.playBtns[this.gameLogic.getPlayer()],
            x: this.centerX - this.offset,
            duration: 200,
            onComplete: this.runSpinNumber.bind(this, 0)
        })
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
        this.sceneEvents.emit(GameEvents.playBtn.spinEnd)
    }

    private onPawnMoveEnd(): void {
        this.scene.add.tween({
            targets: this.wonValue,
            y: this.centerY + this.offset,
            duration: 200
        })

        this.playBtns[this.gameLogic.getPlayer()].setPosition(this.centerX, this.centerY - this.offset)
        this.scene.add.tween({
            targets: this.playBtns[this.gameLogic.getPlayer()],
            y: this.centerY,
            duration: 200,
            onComplete: this.enable.bind(this)
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
