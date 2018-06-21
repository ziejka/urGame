const maxNumber = 5

export default class GameState {
    private pawnsPos: number[][]
    private player: number
    private score: number[][]
    private wonNumber: number
    private enabledPawns: number[]
    private bonusField: number[] = [4, 8, 12, 16]
    private warZone: number[] = [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]
    private availableMoves: number[];

    constructor() {
        this.pawnsPos = [new Array(7).fill(0), new Array(7).fill(0)]
        this.player = 0
        this.score = new Array(2).fill(0)
        this.wonNumber = -1

        window['state'] = this
    }

    drawStep(): void {
        this.drawNumber()
        this.availableMoves = this.calculateAvailableMoves()
    }

    movePawn(pawnIndex: number) {
        this.pawnsPos[this.player][pawnIndex] += this.wonNumber
    }

    changePlayer() {
        this.player = this.getOponent()
    }

    getWonNumber(): number {
        return this.wonNumber
    }

    getPlayer(): number {
        return this.player
    }

    getAvailableMoves() {
        return this.availableMoves
    }

    private getOponent() {
        return this.player > 0 ? 0 : 1
    }

    private drawNumber() {
        this.wonNumber = Math.floor(Math.random() * maxNumber)
    }

    private calculateAvailableMoves() {
        let activePawns: number[] = this.pawnsPos[this.player],
            availableMoves: number[] = []

        activePawns.forEach(oldPos => {
            let newPos = oldPos + this.wonNumber
            if (activePawns.includes(newPos)) {
                availableMoves.push(0)
                return
            }

            if (oldPos === 0 && availableMoves.includes(newPos)) {
                availableMoves.push(0)
                return
            }

            newPos = this.adjustPosAgainstOponent(newPos)

            if (activePawns.includes(newPos)) {
                availableMoves.push(0)
                return
            }

            availableMoves.push(newPos)
        })

        return availableMoves
    }

    private adjustPosAgainstOponent(newPos: number) {
        let oponentPawns: number[] = this.pawnsPos[this.getOponent()]

        if (!oponentPawns.includes(newPos)) {
            return newPos
        }

        if (!this.warZone.includes(newPos)) {
            return newPos
        }

        if (!this.bonusField.includes(newPos)) {
            return newPos
        }

        return this.adjustPosAgainstOponent(newPos++)
    }
}
