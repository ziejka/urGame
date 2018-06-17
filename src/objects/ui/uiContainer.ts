import UiBg from './uiBg';
import PlayBtnBg from './playBtnBg';

export default class UiContainer extends Phaser.GameObjects.Container {
    constructor(scene: Phaser.Scene, centerPoints: Phaser.Geom.Point) {
        super(scene)

        this.add(new UiBg(scene, centerPoints))
        this.add(new PlayBtnBg(scene, centerPoints))
        let t = scene.add.text(100, 500, '2', { font: "40px CustomFont", color: '#f1faee' })
    }
}
