import { Scene } from 'phaser';

export default class GameAnimations {
    static createAnimations(scene: Scene): void {
        let configs = [{
            key: 'bluePawnJump',
            frames: scene.anims.generateFrameNumbers('bluePawn', { start: 0, end: 20 }),
            frameRate: 30,
            repeat: -1
        },
        {
            key: 'redPawnJump',
            frames: scene.anims.generateFrameNumbers('redPawn', { start: 0, end: 20 }),
            frameRate: 30,
            repeat: -1
        }]

        configs.forEach(conf => scene.anims.create(conf))
    }

}
