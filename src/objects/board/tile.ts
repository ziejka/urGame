export default class Tile extends Phaser.GameObjects.Sprite {
    private originalPosition: Phaser.Geom.Point

    constructor(scene: Phaser.Scene, position: Phaser.Geom.Point) {
        const textureName: string = 'tile'
        super(scene, position.x, position.y, textureName)
        this.originalPosition = position
    }

    update(): void {
    }
}
