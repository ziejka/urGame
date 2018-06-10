import { BoardTypes } from "../../config/config";
import BasicBoard from "./BasicBoard";

export default class BoardFactory {

    createBoard(type: number, scene: Phaser.Scene, tilesPositions: Phaser.Geom.Point[]): Phaser.GameObjects.Container {
        if (type === BoardTypes.Basic) {
            return new BasicBoard(scene, tilesPositions)
        }
    }
}
