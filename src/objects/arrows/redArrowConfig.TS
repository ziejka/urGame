import AbstractArrowsConfig from "./abstractArrowsConfig"
import { ArrowsNames } from "../../config/config";

export default class RedArrowsConfig extends AbstractArrowsConfig {
    constructor(tilesPositions: Phaser.Geom.Point[]) {
        super(tilesPositions)
    }

    getXOffsets(): number[] {
        return [
            this.x, this.x, this.x, this.x - this.topSideX,
            this.x + this.xDistance, this.x + this.xDistance, this.x + this.xDistance, this.x + this.xDistance,
            this.x + this.xDistance, this.x + this.xDistance, this.x - this.bottomSideX, this.x + this.xDistance,
            this.x + this.topSideXPlus, this.x + this.bottomSideX, this.x + this.xDistance, this.x + this.topSideX
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
        return 1
    }

    addFourthImage(images: string[]): string[] {
        images.push(this.imageNames.NW)
        return images
    }
    addRestImages(images: string[]): string[] {
        images.push(this.imageNames.SW)
        images.push(this.imageNames.S)
        images.push(this.imageNames.NE)
        images.push(this.imageNames.SE)
        images.push(this.imageNames.N)
        images.push(this.imageNames.NE)
        return images
    }
}
