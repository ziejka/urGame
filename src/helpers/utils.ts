export class Utils {
    public static getCetnerPosition(): Phaser.Geom.Point {
        const gameWidth: number = 540,
            gameHeight: number = 960

        return new Phaser.Geom.Point(Math.floor(Math.min(window.innerWidth, gameWidth) / 2), Math.floor(Math.min(window.innerHeight, gameHeight) / 2))
    }

}
