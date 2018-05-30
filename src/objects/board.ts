import Tile from "./tile";

export default class Board extends Phaser.GameObjects.Container {
    private tiles: Phaser.GameObjects.Sprite[];

    constructor(scene: Phaser.Scene, centerPoints: Phaser.Geom.Point) {
        super(scene)

        this.tiles = this.createTiles(centerPoints)
        this.add(this.tiles)
    }

    private createTiles(centerPoints: Phaser.Geom.Point): Phaser.GameObjects.Sprite[] {
        return this.generateBoarPositions(centerPoints).map(pos => new Tile(this.scene, pos))
    }

    private generateBoarPositions(centerPoints: Phaser.Geom.Point): Phaser.Geom.Point[] {
        let i: number, j: number, yNext: number,
            xOffset: number = 80,
            yOffset: number = 60,
            yLowerOffset: number = 30,
            yStart: number = -300,
            x: number[] = [-xOffset, 0, xOffset],
            yAdditionalOffset: number[] = [yLowerOffset, 0, yLowerOffset],
            boardPositions: Phaser.Geom.Point[] = []

        for (i = 0; i < 8; i++) {
            yNext = yStart + yOffset * i

            if (i > 3 && i < 6) {
                boardPositions.push(new Phaser.Geom.Point(centerPoints.x, centerPoints.y + yNext))
            } else {
                for (j = 0; j < 3; j++) {
                    boardPositions.push(new Phaser.Geom.Point(centerPoints.x + x[j], centerPoints.y + yNext + yAdditionalOffset[j]))
                }
            }
        }
        return boardPositions
    }

    update(): void {
        this.tiles.forEach(t => t.update())
    }
}
