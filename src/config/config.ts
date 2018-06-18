export enum BoardTypes {
    Basic = 0
}

export enum Players {
    Blue = 0,
    Red = 1
}

export enum PlayersImages {
    Blue = "bluePawn",
    Red = "redPawn"
}

export enum Colors {
    Blue = "#a8dadc",
    Red = "#e63946",
    Shadow = 'rgba(0, 0, 0, 0.5)'
}

export enum Font {
    fontNormal = '40px CustomFont',
    fontFamily = 'CustomFont'
}

export const GameEvents = {
    playBtn: {
        clicked: Symbol()
    },
    pawn: {
        moveFinished: Symbol()
    }
}

export const PlayersPawnIndexes: number[][] = [
    [9, 6, 3, 0, 1, 4, 7, 10, 12, 13, 15, 16, 19, 18, 17, 14],
    [11, 8, 5, 2, 1, 4, 7, 10, 12, 13, 15, 14, 17, 18, 19, 16]
]
