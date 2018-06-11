import GameUtils from '../../utils/GameUtils';

export default abstract class AbstractPawnConfig {
    public positions: Phaser.Geom.Point[];
    public texture: string

    constructor(tilesPoistion: Phaser.Geom.Point[], centerPoints: Phaser.Geom.Point) {
        this.positions = GameUtils.generatePlayerPosition(tilesPoistion, this.getPlayersPawnIndexes())
        this.positions.unshift(this.getFirstPosition(centerPoints))
        this.positions.push(this.getLastPosition(centerPoints))
        this.texture = this.getTexture()
    }

    abstract getTexture(): string
    abstract getPlayersPawnIndexes(): number[]
    abstract getFirstPosition(centerPoints: Phaser.Geom.Point): Phaser.Geom.Point
    abstract getLastPosition(centerPoints: Phaser.Geom.Point): Phaser.Geom.Point
}
