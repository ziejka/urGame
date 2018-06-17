export default class UiBg extends Phaser.GameObjects.Sprite {
    constructor(scene: Phaser.Scene, centerPoint: Phaser.Geom.Point) {
        super(scene, 0, 0, 'uiBg')
        this.setPosition(0, centerPoint.y * 2 - this.height / 2)
        this.setScale(1000, 1)
    }

}
