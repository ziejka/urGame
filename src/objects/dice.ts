export default class Dice extends Phaser.GameObjects.Sprite {
    constructor(scene: Phaser.Scene, centerPoint: Phaser.Geom.Point) {
        super(scene, centerPoint.x, centerPoint.y * 2, "texture")
    }
}
