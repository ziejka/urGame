import ArrowConfig from "./arrowConfig";
import { PlayersPawnIndexes } from "../../config/config";

export default abstract class AbstractArrowsConfig {
    private arrowsConfig: ArrowConfig[]
    x: number = -4
    y: number = 7
    xDistance: number = 15
    topSideX: number = 35
    topSideY: number = 30
    bottomSideX: number = 35
    bottomSideY: number = 10
    topSideXPlus: number = 40
    topSideYPlus: number = 25
    fullY: number = 40
    images: string[]

    constructor(tilesPositions: Phaser.Geom.Point[]) {
        this.images = this.generateImages()
        this.arrowsConfig = this.generateConfig(tilesPositions)
    }

    abstract getXOffsets(): number[]
    abstract getYOffsets(): number[]
    abstract getPlayer(): number
    abstract generateImages(): string[]

    getArrowsConfig(): ArrowConfig[] {
        return this.arrowsConfig
    }

    getImage(idx: number): string {
        return this.images[idx]
    }

    private generateConfig(tilesPositions: Phaser.Geom.Point[]): ArrowConfig[] {
        let pos: Phaser.Geom.Point,
            img: string,
            ox, oy,
            config = PlayersPawnIndexes[this.getPlayer()].map((posIndex, index) => {
                ox = this.getXOffsets()[index]
                oy = this.getYOffsets()[index]
                pos = new Phaser.Geom.Point(tilesPositions[posIndex].x + ox, tilesPositions[posIndex].y + oy)
                img = this.getImage(index)
                return new ArrowConfig(pos, img)
            })

        return config
    }
}
