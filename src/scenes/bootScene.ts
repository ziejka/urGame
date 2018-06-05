export class BootScene extends Phaser.Scene {
    constructor() {
        super({
            key: "BootScene"
        });
    }

    preload(): void {
        this.load.image("mapTest", "./assets/images/mapTest.png");
        this.load.image("tile", "./assets/images/tile.png");
        this.load.image("bluePawn", "./assets/images/blue_pawn.png");
        this.load.image("redPawn", "./assets/images/blue_pawn.png");
        this.load.image("blueArrow", "./assets/images/blue_arrow.png");
        this.load.image("redArrow", "./assets/images/red_arrow.png");
    }

    create(): void {
        this.scene.start("MainScene");
    }
}
