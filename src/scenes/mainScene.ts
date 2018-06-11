import BoardFactory from "../objects/board/BoardFactory";
import { BoardTypes } from "../config/config";
import GameUtils from "../utils/GameUtils";
import ArrowsContainer from "../objects/arrows/arrowsContainer";
import PawnsContainer from "../objects/pawns/pawnsContainer";

export class MainScene extends Phaser.Scene {
    private boardFactory: BoardFactory

    constructor() {
        super({
            key: "MainScene"
        });

        this.boardFactory = new BoardFactory()
    }

    create(): void {
        let centerPoints: Phaser.Geom.Point = new Phaser.Geom.Point(Math.floor(this.cameras.main.width / 2), Math.floor(this.cameras.main.height / 2)),
            tilesPositions: Phaser.Geom.Point[] = GameUtils.generateTilesPositions(centerPoints),
            board: Phaser.GameObjects.Container = this.boardFactory.createBoard(BoardTypes.Basic, this, tilesPositions),
            arrows: Phaser.GameObjects.Container = new ArrowsContainer(this, tilesPositions),
            pawnsContainer: Phaser.GameObjects.Container = new PawnsContainer(this, tilesPositions, centerPoints)

        this.add.existing(board)
        this.add.existing(arrows)
        this.add.existing(pawnsContainer)
    }

    update(): void {
        this.children.list.forEach(c => c.update())
    }


}
