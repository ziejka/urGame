import Board from "../objects/board";

export class MainScene extends Phaser.Scene {
    private phaserSprite: Phaser.GameObjects.Sprite;

    constructor() {
        super({
            key: "MainScene"
        });
    }

    create(): void {
        let centerPoints = new Phaser.Geom.Point(Math.floor(this.cameras.main.width / 2), Math.floor(this.cameras.main.height / 2)),
            board = new Board(this, centerPoints)
        // let map = this.add.sprite(this.cameras.main.width / 2, this.cameras.main.height / 2 - 20, 'mapTest')
        // window['map'] = map

        this.add.existing(board)
        window['scene'] = this
    }

    update(): void {
        this.children.list.forEach(c => c.update())
    }

}
