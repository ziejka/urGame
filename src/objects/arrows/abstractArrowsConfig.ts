import ArrowConfig from "./arrowConfig";
import { PlayersPawnIndexes, Players } from "../../config/config";
import ArrowsImagesNames from "./arrowsImagesNames";

export default abstract class AbstractArrowsConfig {
    private arrowsConfig: ArrowConfig[]

    imageNames: ArrowsImagesNames
    x: number = -4
    y: number = 7
    xDistance: number = 15
    topSideX: number = 30
    topSideY: number = 30
    bottomSideX: number = 30
    bottomSideY: number = 10
    topSideXPlus: number = 35
    topSideYPlus: number = 25
    fullY: number = 40
    images: string[]

    constructor(tilesPositions: Phaser.Geom.Point[]) {
        this.imageNames = new ArrowsImagesNames(Players[this.getPlayer()])
        this.images = this.generateImages()
        this.arrowsConfig = this.generateConfig(tilesPositions)
    }

    abstract getXOffsets(): number[]
    abstract getYOffsets(): number[]
    abstract getPlayer(): number
    abstract addFourthImage(images: string[]): string[]
    abstract addRestImages(images: string[]): string[]

    generateImages(): string[] {
        let images: string[] = [],
            index: number

        for (index = 0; index < 3; index++) {
            images.push(this.imageNames.N)
        }

        images = this.addFourthImage(images)

        for (index = 5; index < 11; index++) {
            images.push(this.imageNames.S)
        }

        images = this.addRestImages(images)

        return images
    }

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
