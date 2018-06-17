export default class PlayBtnBg extends Phaser.GameObjects.Sprite {
    constructor(scene: Phaser.Scene, centerPoint: Phaser.Geom.Point) {
        super(scene, 0, 0, 'btnBg')
        this.setPosition(centerPoint.x, centerPoint.y * 2 - this.height / 2)
    }

}
