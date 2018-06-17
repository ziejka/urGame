export default class GameUtils {
    static generateTilesPositions(centerPoints: Phaser.Geom.Point): Phaser.Geom.Point[] {
        let i: number, j: number,
            yNext: number,
            xOffset: number = 110,
            yOffset: number = 90,
            yLowerOffset: number = 42,
            yStart: number = -350,
            x: number[] = [-xOffset, 0, xOffset],
            yAdditionalOffset: number[] = [yLowerOffset, 0, yLowerOffset],
            boardPositions: Phaser.Geom.Point[] = []

        for (i = 0; i < 8; i++) {
            yNext = yStart + yOffset * i

            if (i > 3 && i < 6) {
                boardPositions.push(new Phaser.Geom.Point(centerPoints.x + x[1], centerPoints.y + yNext))
            } else {
                for (j = 0; j < 3; j++) {
                    boardPositions.push(new Phaser.Geom.Point(centerPoints.x + x[j], centerPoints.y + yNext + yAdditionalOffset[j]))
                }
            }
        }
        return boardPositions
    }

    static generatePlayerPosition(tilesPositions: Phaser.Geom.Point[], playersPawnIndexes: number[]): Phaser.Geom.Point[] {
        let xOffset: number = 2,
            yOffset: number = 33

        return playersPawnIndexes.map(posIndex => new Phaser.Geom.Point(tilesPositions[posIndex].x + xOffset, tilesPositions[posIndex].y - yOffset))
    }
}
