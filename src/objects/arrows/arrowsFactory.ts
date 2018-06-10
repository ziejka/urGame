import { Players } from "../../config/config";
import ArrowConfig from "./arrowConfig";
import BlueArrowsConfig from "./blueArrowConfig";
import RedArrowsConfig from "./redArrowConfig";
import Arrows from "./arrows";

export default class ArrowsFactory {
    static createArrows(scene: Phaser.Scene, tilesPositions, player: number): Arrows {
        let config: ArrowConfig[]

        if (player === Players.Blue) {
            config = new BlueArrowsConfig(tilesPositions).getArrowsConfig()
        } else {
            config = new RedArrowsConfig(tilesPositions).getArrowsConfig()
        }

        return new Arrows(scene, config)
    }
}
