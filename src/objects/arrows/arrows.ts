import ArrowConfig from "./arrowConfig";

export default class Arrows {
    private arrows: Phaser.GameObjects.Sprite[]

    constructor(scene: Phaser.Scene, arrowsConfig: ArrowConfig[]) {
        this.arrows = this.createArrows(scene, arrowsConfig)
    }

    getArrows(): Phaser.GameObjects.Sprite[] {
        return this.arrows
    }

    addTween(scene: Phaser.Scene): void {
        this.arrows.forEach((arrow, index) => {
            arrow.setAlpha(0.5)
            scene.add.tween({
                targets: arrow,
                alpha: 1,
                duration: 100,
                yoyo: true,
                repeat: 1000,
                delay: index * 100,
                repeatDelay: 400
            })
        })
    }

    private createArrows(scene: Phaser.Scene, arrowsConfig: ArrowConfig[]): Phaser.GameObjects.Sprite[] {
        let arrows: Phaser.GameObjects.Sprite[] = arrowsConfig.map(config =>
            new Phaser.GameObjects.Sprite(scene, config.position.x, config.position.y, config.image))

        return arrows
    }
}
