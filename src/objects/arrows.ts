import { Players, PlayersPawnIndexes, ArrowsOffset, ArrowsAngles } from "../config/config";

const imgNames = ['blueArrow', 'redArrow']

export default class Arrows extends Phaser.GameObjects.Container {
    private redArrows: Phaser.GameObjects.Sprite[]
    private blueArrows: Phaser.GameObjects.Sprite[]

    constructor(scene: Phaser.Scene, tilesPositions: Phaser.Geom.Point[]) {
        super(scene)
        this.blueArrows = this.createArrows(scene, tilesPositions, Players.Blue)
        this.redArrows = this.createArrows(scene, tilesPositions, Players.Red)

        // tilesPositions.map((p, i) => new Phaser.GameObjects.Text(scene, p.x - 5, p.y - 10, i + "", { fontSize: '32px', fill: '#000' })).forEach(x => this.add(x))
    }

    private createArrows(scene: Phaser.Scene, tilesPositions: Phaser.Geom.Point[], player: number): Phaser.GameObjects.Sprite[] {
        let arrows: Phaser.GameObjects.Sprite[] = PlayersPawnIndexes[player].map(posIndex =>
            new Phaser.GameObjects.Sprite(scene, tilesPositions[posIndex].x, tilesPositions[posIndex].y, imgNames[player]))

        arrows.forEach((arrow, index) => {
            arrow.x += ArrowsOffset[player][index].x
            arrow.y += ArrowsOffset[player][index].y
            arrow.setAngle(ArrowsAngles[player][index])
            arrow.setAlpha(0.7)
            this.add(arrow)
        })
        return arrows
    }
}
