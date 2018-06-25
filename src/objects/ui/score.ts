import { Font, Colors, GameEvents } from '../../config/config';
import iClientGameLogic from '../../gameLogic/iClientGameLogic';

const yOffset: number = 150
export default class Score extends Phaser.GameObjects.Container {
    private scores: Phaser.GameObjects.Text[] = []
    private gameLogic: iClientGameLogic;

    constructor(scene: Phaser.Scene, centerPoints: Phaser.Geom.Point, gameLogic: iClientGameLogic) {
        super(scene)

        this.gameLogic = gameLogic

        this.scores.push(scene.add.text(centerPoints.x - 220, centerPoints.y + yOffset, "0", { font: Font.fontNormal, color: Colors.White }))
        this.scores.push(scene.add.text(centerPoints.x + 190, centerPoints.y + yOffset, "0", { font: Font.fontNormal, color: Colors.White }))

        scene.events.on(GameEvents.pawn.lastJumpEnd, this.updateScore, this)
    }

    private updateScore(): void {
        const newScores = this.gameLogic.getScore()
        newScores.forEach((score, i) => this.scores[i].setText(score.toString()))
    }
}
