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
        },
        {
            key: 'bluePawnEnabled',
            frames: scene.anims.generateFrameNumbers('bluePawnEnabled', { start: 0, end: 16 }),
            frameRate: 30,
            repeat: -1
        },
        {
            key: 'redPawnEnabled',
            frames: scene.anims.generateFrameNumbers('redPawnEnabled', { start: 0, end: 16 }),
            frameRate: 30,
            repeat: -1
        }]

        configs.forEach(conf => scene.anims.create(conf))
    }

}
