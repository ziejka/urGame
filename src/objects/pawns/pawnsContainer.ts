import Pawn from "./pawn";
import BluePawnConfig from './bluePawnConfig';
import RedPawnConfig from './redPawnConfig';

export default class PawnsContainer extends Phaser.GameObjects.Container {
    private playesrPawns: Pawn[][];

    constructor(scene: Phaser.Scene, tilesPositions: Phaser.Geom.Point[], centerPoints: Phaser.Geom.Point) {
        super(scene)
        this.playesrPawns = this.createPlayersPawns(scene, tilesPositions, centerPoints)
    }

    private createPlayersPawns(scene: Phaser.Scene, tilesPositions: Phaser.Geom.Point[], centerPoints: Phaser.Geom.Point) {
        let playerOneConfig = new BluePawnConfig(tilesPositions, centerPoints),
            playerTwoConfig = new RedPawnConfig(tilesPositions, centerPoints),
            bluePlayerPawns: Pawn[] = [],
            redPlayerPawns: Pawn[] = [],
            yOffset: number;

        for (let index = 0; index < 8; index++) {
            yOffset = 35 * index
            const firstBluePos = new Phaser.Geom.Point(playerOneConfig.positions[0].x, playerOneConfig.positions[0].y - yOffset),
                firstRedPos = new Phaser.Geom.Point(playerTwoConfig.positions[0].x, playerTwoConfig.positions[0].y - yOffset),
                bluePawn = new Pawn(scene, playerOneConfig, firstBluePos),
                redPawn = new Pawn(scene, playerTwoConfig, firstRedPos)

            this.add(bluePawn)
            this.add(redPawn)

            bluePlayerPawns.push(bluePawn)
            redPlayerPawns.push(redPawn)
        }
        return [bluePlayerPawns, redPlayerPawns]
    }
}
