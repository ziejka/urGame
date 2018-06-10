import AbstractArrowsConfig from "./abstractArrowsConfig"
import { ArrowsNames } from "../../config/config";

export default class RedArrowsConfig extends AbstractArrowsConfig {
    constructor(tilesPositions: Phaser.Geom.Point[]) {
        super(tilesPositions)
    }

    getXOffsets(): number[] {
        return [
            this.x, this.x, this.x, this.x + this.topSideX,
            this.x - this.xDistance, this.x - this.xDistance, this.x - this.xDistance, this.x - this.xDistance,
            this.x - this.xDistance, this.x - this.xDistance, this.x + this.xDistance, this.x - this.xDistance,
            this.x - this.topSideXPlus, this.x - this.bottomSideX, this.x - this.xDistance, this.x - this.topSideX
        ]
    }

    getYOffsets(): number[] {
        return [
            this.y, this.y, this.y, this.y - this.topSideY,
            this.y, this.y, this.y, this.y,
            this.y, this.y, this.y - this.bottomSideY, this.y,
            this.y - this.topSideYPlus, this.y - this.bottomSideY, this.y - this.fullY, this.y - this.topSideY
        ]
    }

    getPlayer(): number {
        return 0
    }

    generateImages(): string[] {
        let images: string[] = []
        for (let index = 0; index < 16; index++) {
            images.push(ArrowsNames.blueArrow)
        }
        return images
    }
}
