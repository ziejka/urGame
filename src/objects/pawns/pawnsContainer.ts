import Pawn from "./pawn";
import BluePawnConfig from './bluePawnConfig';

export default class PawnsContainer extends Phaser.GameObjects.Container {
    private bluePlayer: Phaser.GameObjects.Sprite[]
    constructor(scene: Phaser.Scene, tilesPositions: Phaser.Geom.Point[], centerPoints: Phaser.Geom.Point) {
        let playerOneConfig = new BluePawnConfig(tilesPositions, centerPoints)
        super(scene)

        this.bluePlayer = [new Pawn(scene, playerOneConfig)]

        this.bluePlayer.forEach(sprite => this.add(sprite))
    }
}
