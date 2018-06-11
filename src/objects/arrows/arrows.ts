import ArrowConfig from "./arrowConfig";

export default class Arrows {
    private arrows: Phaser.GameObjects.Sprite[]
    private tweens: Phaser.Tweens.Tween[]

    constructor(scene: Phaser.Scene, arrowsConfig: ArrowConfig[]) {
        this.arrows = this.createArrows(scene, arrowsConfig)
        this.tweens = this.createTweens(scene)
        this.setAlpha(0.5)
    }

    setAlpha(alpha) {
        this.arrows.forEach(sprite => {
            sprite.setAlpha(alpha)
        })
    }

    playAnimation() {
        this.tweens.forEach(tween => tween.resume())
    }

    pauseAnimation() {
        this.tweens.forEach(tween => tween.pause())
        this.setAlpha(0.5)
    }

    getArrows(): Phaser.GameObjects.Sprite[] {
        return this.arrows
    }

    private createTweens(scene: Phaser.Scene): Phaser.Tweens.Tween[] {
        let speed: number = 150
        let tweens: Phaser.Tweens.Tween[] = this.arrows.map((arrow, index) =>
            scene.add.tween({
                targets: arrow,
                alpha: 1,
                duration: speed * 1.5,
                yoyo: true,
                repeat: -1,
                delay: index * speed,
                repeatDelay: speed * 4,
                paused: true
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
