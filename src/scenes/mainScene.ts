import BoardFactory from "../objects/board/BoardFactory";
import { BoardTypes } from "../config/config";
import GameUtils from "../utils/GameUtils";
import ArrowsContainer from "../objects/arrows/arrowsContainer";
import PawnsContainer from "../objects/pawns/pawnsContainer";
import GameAnimations from '../utils/gameAnimations';
import UiContainer from '../objects/ui/uiContainer';
import PlayBtnContainer from '../objects/ui/playBtnContainer';
import GameLogic from '../gameLogic/gameLogic';
import Score from '../objects/ui/score';

export class MainScene extends Phaser.Scene {
    private boardFactory: BoardFactory

    constructor() {
        super({
            key: "MainScene"
        });

        this.boardFactory = new BoardFactory()
    }

    preload(): void {
        GameAnimations.createAnimations(this)
    }

    create(): void {
        let gameLogic: GameLogic = new GameLogic(this.events),
            centerPoints: Phaser.Geom.Point = new Phaser.Geom.Point(Math.floor(this.cameras.main.width / 2), Math.floor(this.cameras.main.height / 2)),
            tilesPositions: Phaser.Geom.Point[] = GameUtils.generateTilesPositions(centerPoints),
            board: Phaser.GameObjects.Container = this.boardFactory.createBoard(BoardTypes.Basic, this, tilesPositions),
            arrows: Phaser.GameObjects.Container = new ArrowsContainer(this, tilesPositions),
            pawnsContainer: Phaser.GameObjects.Container = new PawnsContainer(this, tilesPositions, centerPoints, gameLogic),
            uiContainer: Phaser.GameObjects.Container = new UiContainer(this, centerPoints),
            btn: Phaser.GameObjects.Container = new PlayBtnContainer(this, centerPoints, gameLogic),
            scores: Phaser.GameObjects.Container = new Score(this, centerPoints, gameLogic)

        this.add.existing(board)
        this.add.existing(arrows)
        this.add.existing(pawnsContainer)
        this.add.existing(uiContainer)
        this.add.existing(btn)
        this.add.existing(scores)
    }

    update(): void {
        this.children.list.forEach(c => c.update())
    }


}
