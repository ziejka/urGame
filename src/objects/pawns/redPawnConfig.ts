import AbstractPawnConfig from './abstractPawnConfig';
import { PlayersImages, PlayersPawnIndexes, Players } from '../../config/config';

export default class RedPawnConfig extends AbstractPawnConfig {

    getTexture(): string {
        return PlayersImages.Red
    }

    getPlayersPawnIndexes(): number[] {
        return PlayersPawnIndexes[Players.Red]
    }

    getFirstPosition(centerPoints: Phaser.Geom.Point): Phaser.Geom.Point {
        return new Phaser.Geom.Point(centerPoints.x * 2 - 50, centerPoints.y)
    }

    getLastPosition(): Phaser.Geom.Point {
        let lastPositionOnBoard = this.positions[this.positions.length - 1]
        return new Phaser.Geom.Point(lastPositionOnBoard.x + 100, lastPositionOnBoard.y - 50)
    }
}
