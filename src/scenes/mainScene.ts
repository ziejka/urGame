import { Utils } from "../helpers/utils";
import Board from "../objects/board";

export class MainScene extends Phaser.Scene {
    private phaserSprite: Phaser.GameObjects.Sprite;

    constructor() {
        super({
            key: "MainScene"
        });
    }

    create(): void {
        let board = new Board(this)


        this.add.existing(board)
        window['scene'] = this
    }

    update(): void {
        this.children.list.forEach(c => c.update())
    }

}
