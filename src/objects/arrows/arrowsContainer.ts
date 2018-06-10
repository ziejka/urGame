import { Players, PlayersPawnIndexes, ArrowsOffset, ArrowsAngles } from "../../config/config";
import Arrows from "./arrows";
import ArrowsFactory from "./arrowsFactory";

export default class ArrowsContainer extends Phaser.GameObjects.Container {
    private blueArrows: Arrows
    private redArrows: Arrows

    constructor(scene: Phaser.Scene, tilesPositions: Phaser.Geom.Point[]) {
        super(scene)
        this.blueArrows = ArrowsFactory.createArrows(scene, tilesPositions, Players.Blue)
        this.redArrows = ArrowsFactory.createArrows(scene, tilesPositions, Players.Blue)

        this.blueArrows.getArrows().forEach(sprite => this.add(sprite))
        this.redArrows.getArrows().forEach(sprite => this.add(sprite))
    }
}
