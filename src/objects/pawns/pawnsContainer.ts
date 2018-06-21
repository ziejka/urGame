import Pawn from "./pawn";
import BluePawnConfig from './bluePawnConfig';
import RedPawnConfig from './redPawnConfig';
import { GameEvents, Players } from '../../config/config';
import iClientGameLogic from '../../gameLogic/iClientGameLogic';

export default class PawnsContainer extends Phaser.GameObjects.Container {
    private playesrPawns: Pawn[][];
    private gameLogic: iClientGameLogic;
    private sceneEvents: Phaser.Events.EventEmitter
    private bluePawnsConfig: BluePawnConfig;
    private redPawnsConfig: RedPawnConfig;
    private yOffsetsList: number[] = []
    private pawnsOnStartPos: number[][] = [[], []]

    constructor(scene: Phaser.Scene, tilesPositions: Phaser.Geom.Point[], centerPoints: Phaser.Geom.Point, gameLogic: iClientGameLogic) {
        super(scene)
        this.bluePawnsConfig = new BluePawnConfig(tilesPositions, centerPoints)
        this.redPawnsConfig = new RedPawnConfig(tilesPositions, centerPoints)
        this.playesrPawns = this.createPlayersPawns(scene)
        this.gameLogic = gameLogic
        this.sceneEvents = scene.events
        this.setUpEvents()
    }

    private setUpEvents(): void {
        this.sceneEvents.on(GameEvents.playBtn.spinEnd, this.onSpinEnd, this)
        this.sceneEvents.on(GameEvents.pawn.selected, this.onPawnClicked, this)
    }

    private onPawnClicked(pawnIndex: number): void {
        this.playesrPawns[this.gameLogic.getPlayer()].forEach(p => p.disable())
        this.playesrPawns[this.gameLogic.getPlayer()][pawnIndex].movePawnBy(this.gameLogic.getWonNumber())
    }

    private onSpinEnd(): void {
        if (this.gameLogic.getWonNumber() < 1) {
            setTimeout(() => {
                this.sceneEvents.emit(GameEvents.pawn.moveFinished)
            }, 800);
            return
        }

        this.enablePawns()
    }

    private createPlayersPawns(scene: Phaser.Scene) {
        let bluePlayerPawns: Pawn[] = [],
            redPlayerPawns: Pawn[] = [],
            yOffset: number;

        for (let index = 0; index < 8; index++) {
            yOffset = 35 * index

            this.yOffsetsList.push(yOffset)
            const firstBluePos = new Phaser.Geom.Point(this.bluePawnsConfig.positions[0].x, this.bluePawnsConfig.positions[0].y - yOffset),
                firstRedPos = new Phaser.Geom.Point(this.redPawnsConfig.positions[0].x, this.redPawnsConfig.positions[0].y - yOffset),
                bluePawn = new Pawn(scene, this.bluePawnsConfig, firstBluePos, index),
                redPawn = new Pawn(scene, this.redPawnsConfig, firstRedPos, index)

            this.add(bluePawn)
            this.add(redPawn)

            bluePlayerPawns.push(bluePawn)
            redPlayerPawns.push(redPawn)
            this.pawnsOnStartPos[Players.Blue].push(index)
            this.pawnsOnStartPos[Players.Blue].push(index)
        }
        return [bluePlayerPawns, redPlayerPawns]
    }

    private enablePawns() {
        const availableMoves: number[] = this.gameLogic.getAvailableMoves(),
            activePlayerPawns: Pawn[] = this.playesrPawns[this.gameLogic.getPlayer()]

        availableMoves.forEach((move, index) => {
            if (move > 0) {
                activePlayerPawns[index].enable()
            }
        })
    }
}
