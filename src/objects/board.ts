import Tile from "./tile";
import { Utils } from "../helpers/utils";

export default class Board extends Phaser.GameObjects.Container {
    private tiles: Phaser.GameObjects.Sprite[];

    constructor(scene: Phaser.Scene) {
        super(scene)

        this.tiles = this.createTiles()
        this.add(this.tiles)
    }

    private createTiles(): Phaser.GameObjects.Sprite[] {
        let pos1 = new Phaser.Geom.Point(Utils.getCetnerPosition().x, Utils.getCetnerPosition().y),
            pos2 = new Phaser.Geom.Point(Utils.getCetnerPosition().x, Utils.getCetnerPosition().y - 100)
        return [new Tile(this.scene, pos1), new Tile(this.scene, pos2)]
    }

    update(): void {
        // this.tiles.forEach(t => t.y -= 1)
    }
}
