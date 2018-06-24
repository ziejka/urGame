import Tile from "./tile";

const bonusIndexes: number[] = [0, 2, 10, 14, 16]
const xOffset: number = 5
const yOffset: number = 13

export default class BasicBoard extends Phaser.GameObjects.Container {
    private tiles: Phaser.GameObjects.Sprite[];
    private bonusTiles: Phaser.GameObjects.Sprite[];

    constructor(scene: Phaser.Scene, positions: Phaser.Geom.Point[]) {
        super(scene)

        this.tiles = this.createTiles(positions)
        this.bonusTiles = this.createBonusTiles(positions)
        this.add(this.tiles)
        this.add(this.bonusTiles)
    }

    private createTiles(positions: Phaser.Geom.Point[]): Phaser.GameObjects.Sprite[] {
        return positions.map(pos => new Tile(this.scene, pos))
    }

    private createBonusTiles(positions: Phaser.Geom.Point[]): Phaser.GameObjects.Sprite[] {
        return bonusIndexes.map(bonusIndex =>
            new Phaser.GameObjects.Sprite(this.scene, positions[bonusIndex].x - xOffset, positions[bonusIndex].y - yOffset, 'bonusTile'))
    }


    update(): void {
        this.tiles.forEach(t => t.update())
    }
}
