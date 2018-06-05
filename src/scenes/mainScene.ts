import BoardFactory from "../objects/BoardFactory";
import { BoardTypes } from "../config/config";
import GameUtils from "../utils/GameUtils";
import Arrows from "../objects/Arrows";

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
            arrows: Phaser.GameObjects.Container = new Arrows(this, tilesPositions)
        // new Board(this, centerPoints)
        // let map = this.add.sprite(this.cameras.main.width / 2, this.cameras.main.height / 2 - 20, 'mapTest')
        // window['map'] = map

        this.add.existing(board)
        this.add.existing(arrows)
        window['scene'] = this
    }

    update(): void {
        this.children.list.forEach(c => c.update())
    }

}
