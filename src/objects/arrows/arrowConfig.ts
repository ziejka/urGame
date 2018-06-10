export default class ArrowConfig {
    position: Phaser.Geom.Point
    image: string

    constructor(position: Phaser.Geom.Point, image: string) {
        this.position = position
        this.image = image
    }
}
