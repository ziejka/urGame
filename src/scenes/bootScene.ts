export class BootScene extends Phaser.Scene {
    constructor() {
        super({
            key: "BootScene"
        });
    }

    preload(): void {
        this.add.text(0, 0, "", { font: "1px CustomFont" })
        this.load.image("tile", "./assets/images/tile.png");
        this.load.image("btnBg", "./assets/images/btnBg.png");
        this.load.image("uiBg", "./assets/images/uiBg.png");
        this.load.image("btnMask", "./assets/images/btnMask.png");
        this.load.image("playRed", "./assets/images/PlayIconRed.png");
        this.load.image("playBlue", "./assets/images/PlayIconBlue.png");
        this.load.image("blurRed0", "./assets/images/bluredNumbers/red/0Blur.png");
        this.load.image("blurRed1", "./assets/images/bluredNumbers/red/1Blur.png");
        this.load.image("blurRed2", "./assets/images/bluredNumbers/red/2Blur.png");
        this.load.image("blurRed3", "./assets/images/bluredNumbers/red/3Blur.png");
        this.load.image("blurRed4", "./assets/images/bluredNumbers/red/4Blur.png");
        this.load.spritesheet("bluePawn", "./assets/animations/bluePawn.png", { frameWidth: 83, frameHeight: 80 });
        this.load.spritesheet("redPawn", "./assets/animations/redPawn.png", { frameWidth: 83, frameHeight: 80 });
        this.loadArrows()
    }

    private loadArrows() {
        let directions: string[] = ["N", "NE", "NW", "S", "SE", "SW"],
            colors: string[] = ['Blue', 'Red'],
            name: string

        colors.forEach(color => {
            directions.forEach(dir => {
                name = color + dir
                this.load.image(name, `./assets/images/arrows/${name}.png`)
            })
        })
    }

    create(): void {
        this.scene.start("MainScene");
    }
}
