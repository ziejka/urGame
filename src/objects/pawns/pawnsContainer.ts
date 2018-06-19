import Pawn from "./pawn";
import BluePawnConfig from './bluePawnConfig';
import RedPawnConfig from './redPawnConfig';
import { GameEvents } from '../../config/config';
import iClientGameLogic from '../../gameLogic/iClientGameLogic';

export default class PawnsContainer extends Phaser.GameObjects.Container {
    private playesrPawns: Pawn[][];
    private gameLogic: iClientGameLogic;
    private sceneEvents: Phaser.Events.EventEmitter

    constructor(scene: Phaser.Scene, tilesPositions: Phaser.Geom.Point[], centerPoints: Phaser.Geom.Point, gameLogic: iClientGameLogic) {
        super(scene)
        this.playesrPawns = this.createPlayersPawns(scene, tilesPositions, centerPoints)
        this.gameLogic = gameLogic
        this.sceneEvents = scene.events
        this.setUpEvents()
    }

    private setUpEvents(): void {
        this.sceneEvents.on(GameEvents.playBtn.spinEnd, this.onSpinEnd, this)
        this.sceneEvents.on(GameEvents.pawn.clicked, this.onPawnClicked, this)
    }

    private onPawnClicked(pawnIndex: number): void {
        this.playesrPawns[this.gameLogic.getPlayer()][pawnIndex].movePawnBy(this.gameLogic.getWonNumber())
    }

    private onSpinEnd(): void {
        this.playesrPawns[this.gameLogic.getPlayer()].forEach(pawn => pawn.enable())
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
                bluePawn = new Pawn(scene, playerOneConfig, firstBluePos, index),
                redPawn = new Pawn(scene, playerTwoConfig, firstRedPos, index)

            this.add(bluePawn)
            this.add(redPawn)

            bluePlayerPawns.push(bluePawn)
            redPlayerPawns.push(redPawn)
        }
        return [bluePlayerPawns, redPlayerPawns]
    }
}
