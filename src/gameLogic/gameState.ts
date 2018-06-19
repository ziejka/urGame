const maxNumber = 5

export default class GameState {
    private pawnsPos: number[][]
    private player: number
    private roundNumber: number
    private score: number[][]
    private wonNumber: number

    constructor() {
        this.pawnsPos = [new Array(7).fill(0), new Array(7).fill(0)]
        this.player = 0
        this.roundNumber = 0
        this.score = new Array(2).fill(0)
        this.wonNumber = -1
        window['state'] = this
    }

    movePawn(pawnIndex: number) {
        this.pawnsPos[this.player][pawnIndex] += this.wonNumber
    }

    changePlayer() {
        this.player = this.player > 0 ? 0 : 1
    }

    drawNumber() {
        this.wonNumber = Math.floor(Math.random() * maxNumber) + 1
    }

    getWonNumber(): number {
        return this.wonNumber
    }

    getPlayer(): number {
        return this.player
    }
}
