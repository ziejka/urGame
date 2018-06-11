import Pawn from "./pawn";
import BluePawnConfig from './bluePawnConfig';
import RedPawnConfig from './redPawnConfig';

export default class PawnsContainer extends Phaser.GameObjects.Container {
    private bluePlayer: Phaser.GameObjects.Sprite[]
    private redPlayer: Pawn[];
    constructor(scene: Phaser.Scene, tilesPositions: Phaser.Geom.Point[], centerPoints: Phaser.Geom.Point) {
        let playerOneConfig = new BluePawnConfig(tilesPositions, centerPoints),
            playerTwoConfig = new RedPawnConfig(tilesPositions, centerPoints)
        super(scene)

        this.bluePlayer = [new Pawn(scene, playerOneConfig)]
        this.redPlayer = [new Pawn(scene, playerTwoConfig)]

        this.bluePlayer.forEach(sprite => this.add(sprite))
        this.redPlayer.forEach(sprite => this.add(sprite))
    }
}
