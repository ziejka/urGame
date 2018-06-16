import GameUtils from '../../utils/GameUtils';

export default abstract class AbstractPawnConfig {
    public positions: Phaser.Geom.Point[];
    public texture: string
    public animation: string;

    constructor(tilesPoistion: Phaser.Geom.Point[], centerPoints: Phaser.Geom.Point) {
        this.positions = GameUtils.generatePlayerPosition(tilesPoistion, this.getPlayersPawnIndexes())
        this.positions.unshift(this.getFirstPosition(centerPoints))
        this.positions.push(this.getLastPosition())
        this.texture = this.getTexture()
        this.animation = this.getAnimations()
    }

    abstract getTexture(): string
    abstract getPlayersPawnIndexes(): number[]
    abstract getFirstPosition(centerPoints: Phaser.Geom.Point): Phaser.Geom.Point
    abstract getLastPosition(): Phaser.Geom.Point
    abstract getAnimations(): string
}
