import ArrowConfig from "./arrowConfig";

export default class Arrows {
    private arrows: Phaser.GameObjects.Sprite[]
    private tweens: Phaser.Tweens.Tween[]
    private scene: Phaser.Scene;

    constructor(scene: Phaser.Scene, arrowsConfig: ArrowConfig[]) {
        this.arrows = this.createArrows(scene, arrowsConfig)
        this.setAlpha(0.5)
        this.scene = scene
    }

    setAlpha(alpha) {
        this.arrows.forEach(sprite => {
            sprite.setAlpha(alpha)
        })
    }

    playAnimation() {
        if (!this.tweens) {
            this.tweens = this.createTweens(this.scene)
        } else {
            this.tweens.forEach(tween => tween.resume())
        }
    }

    pauseAnimation() {
        this.tweens.forEach(tween => tween.pause())
        this.setAlpha(0.5)
    }

    getArrows(): Phaser.GameObjects.Sprite[] {
        return this.arrows
    }

    private createTweens(scene: Phaser.Scene): Phaser.Tweens.Tween[] {
        let tweens: Phaser.Tweens.Tween[] = this.arrows.map((arrow, index) =>
            scene.add.tween({
                targets: arrow,
                alpha: 1,
                duration: 100,
                yoyo: true,
                repeat: -1,
                delay: index * 100,
                repeatDelay: 400,
                pause: true
            })
        )

        return tweens
    }

    private createArrows(scene: Phaser.Scene, arrowsConfig: ArrowConfig[]): Phaser.GameObjects.Sprite[] {
        let arrows: Phaser.GameObjects.Sprite[] = arrowsConfig.map(config =>
            new Phaser.GameObjects.Sprite(scene, config.position.x, config.position.y, config.image))

        return arrows
    }
}
