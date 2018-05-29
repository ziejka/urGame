export class Utils {
    static gameWidth: number = 540
    static gameHeight: number = 960
    public static centerX: number = Math.floor(Utils.gameWidth / 2)
    public static centerY: number = Math.floor(Utils.gameHeight / 2)

    static getPawnPositions(): Phaser.Geom.Point[] {
        return []
    }
}
