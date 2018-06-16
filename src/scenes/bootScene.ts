export class BootScene extends Phaser.Scene {
    constructor() {
        super({
            key: "BootScene"
        });
    }

    preload(): void {
        this.load.image("mapTest", "./assets/images/mapTest.png");
        this.load.image("tile", "./assets/images/tile.png");
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
