import { Utils } from "../helpers/utils";

export default class Tile extends Phaser.GameObjects.Sprite {

    constructor(scene: Phaser.Scene, position: Phaser.Geom.Point) {
        const textureName: string = 'tile'
        super(scene, position.x, position.y, textureName)
    }
}
