import AbstractPawnConfig from './abstractPawnConfig';
import { PlayersImages, PlayersPawnIndexes, Players } from '../../config/config';

export default class BluePawnConfig extends AbstractPawnConfig {
    getAnimations(): string {
        return "bluePawnJump"
    }

    getTexture(): string {
        return PlayersImages.Blue
    }

    getPlayersPawnIndexes(): number[] {
        return PlayersPawnIndexes[Players.Blue]
    }

    getFirstPosition(centerPoints: Phaser.Geom.Point): Phaser.Geom.Point {
        return new Phaser.Geom.Point(50, centerPoints.y - this.yOffset)
    }

    getLastPosition(): Phaser.Geom.Point {
        let lastPositionOnBoard = this.positions[this.positions.length - 1]
        return new Phaser.Geom.Point(lastPositionOnBoard.x - 100, lastPositionOnBoard.y - 50)
    }
}
