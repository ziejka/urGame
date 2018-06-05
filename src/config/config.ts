const x: number = -4
const y: number = 7
const xDistance: number = 15
const topSideX: number = 35
const topSideY: number = 30
const bottomSideX: number = 35
const bottomSideY: number = 10
const topSideXPlus: number = 40
const topSideYPlus: number = 25
const fullY: number = 40

export enum BoardTypes {
    Basic = 0
}

export enum Players {
    Blue = 0,
    Red = 1
}

export enum ArrowsNames {
    'blue_arrow'
}

export const PlayersPawnIndexes: number[][] = [
    [9, 6, 3, 0, 1, 4, 7, 10, 12, 13, 15, 16, 19, 18, 17, 14],
    [11, 8, 5, 2, 1, 4, 7, 10, 12, 13, 15, 14, 17, 18, 19, 16]
]

export const ArrowsOffset: Phaser.Geom.Point[][] = [
    [
        p(x, y), p(x, y), p(x, y), p(x + topSideX, y - topSideY),
        p(x - xDistance, y), p(x - xDistance, y), p(x - xDistance, y), p(x - xDistance, y),
        p(x - xDistance, y), p(x - xDistance, y), p(x + bottomSideX, y - bottomSideY), p(x - xDistance, y),
        p(x - topSideXPlus, y - topSideYPlus), p(x - bottomSideX, y - bottomSideY), p(x - xDistance, y - fullY), p(x - topSideX, y - topSideY)],
    [
        p(x, y), p(x, y), p(x, y), p(x - topSideX, y - topSideY),
        p(x + xDistance, y), p(x + xDistance, y), p(x + xDistance, y), p(x + xDistance, y),
        p(x + xDistance, y), p(x + xDistance, y), p(x - bottomSideX, y - bottomSideY), p(x + xDistance, y),
        p(x + topSideX, y - topSideY), p(x + bottomSideX, y - bottomSideY), p(x + xDistance, y - fullY), p(x + topSideX, y - topSideY)]
]

export const ArrowsAngles: number[][] = [
    [
        0, 0, 0, 45,
        180, 180, 180, 180,
        180, 180, 135, 180,
        -45, -135, 0, -45],
    [
        0, 0, 0, -45,
        180, 180, 180, 180,
        180, 180, -135, 180,
        45, 135, 0, 45]
]

function p(x, y): Phaser.Geom.Point {
    return new Phaser.Geom.Point(x, y)
}
