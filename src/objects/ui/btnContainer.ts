export default class BtnContainer extends Phaser.GameObjects.Container {
    private numbers: Phaser.GameObjects.Sprite[];
    private centerX: number;
    private playBtn: Phaser.GameObjects.Sprite;

    constructor(scene: Phaser.Scene, centerPoint: Phaser.Geom.Point) {
        super(scene)
        let btnMask = scene.make.image({ key: 'btnMask', add: false, x: 0, y: 0 }),
            mask = btnMask.createBitmapMask(),
            positionX: number = centerPoint.x + 5,
            positionY: number = centerPoint.y * 2 - btnMask.height / 2 + 3,
            hitArea = new Phaser.Geom.Circle(positionX, positionY, 55)

        this.playBtn = scene.add.sprite(positionX, centerPoint.y * 2 - btnMask.height / 2 + 3, 'playRed')
        this.centerX = centerPoint.x
        this.numbers = this.generateNumbers(scene, centerPoint.x, positionY, mask)
        btnMask.setPosition(positionX, positionY)
        this.add(this.playBtn)
        this.mask = mask
        this.setInteractive(hitArea, Phaser.Geom.Circle.Contains)
        this.on('pointerup', () => {
            this.onBtnClick()
        })
    }

    public onBtnClick(): void {
        this.scene.add.tween({
            targets: this.playBtn,
            x: this.centerX - 100,
            duration: 200,
            onComplete: this.runSpinNumber.bind(this)
        })
    }

    private runSpinNumber() {
        let index = Math.floor(Math.random() * 5),
            target: Phaser.GameObjects.Sprite = this.numbers[index]
        target.setX(this.centerX + 100)
        this.scene.add.tween({
            targets: target,
            x: this.centerX - 100,
            duration: 150,
            onComplete: this.runSpinNumber.bind(this)
        })
    }

    private generateNumbers(scene: Phaser.Scene, positionX: number, positionY: number, mask: Phaser.Display.Masks.BitmapMask): Phaser.GameObjects.Sprite[] {
        let redNumbers = []

        for (let index = 0; index < 5; index++) {
            const sprite = scene.add.sprite(positionX + 100, positionY, `blurRed${index}`)
            sprite.setMask(mask)
            this.add(sprite)
            redNumbers.push(sprite)
        }
        return redNumbers
    }
}
