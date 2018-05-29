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
        let board = new Board(this),
            map = this.add.sprite(this.cameras.main.width / 2, this.cameras.main.height / 2 - 20, 'mapTest')

        this.add.existing(board)
        window['scene'] = this
        window['map'] = map

    }

    update(): void {
        this.children.list.forEach(c => c.update())
    }

}
