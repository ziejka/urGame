export class BootScene extends Phaser.Scene {
    constructor() {
        super({
            key: "BootScene"
        });
    }

    create(): void {

    }

    update(): void {
        this.scene.start("MainMenuScene");
    }
}
