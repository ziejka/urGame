import Tile from "./tILE";

export default class BasicBoard extends Phaser.GameObjects.Container {
    private tiles: Phaser.GameObjects.Sprite[];

    constructor(scene: Phaser.Scene, positions: Phaser.Geom.Point[]) {
        super(scene)

        this.tiles = this.createTiles(positions)
        this.add(this.tiles)
    }

    private createTiles(positions: Phaser.Geom.Point[]): Phaser.GameObjects.Sprite[] {
        return positions.map(pos => new Tile(this.scene, pos))
    }

    update(): void {
        this.tiles.forEach(t => t.update())
    }
}
