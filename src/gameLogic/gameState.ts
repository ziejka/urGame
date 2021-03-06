const maxNumber = 5,
    invertedPositions = {
        12: 16,
        13: 15,
        15: 13,
        16: 12
    }

export default class GameState {
    private pawnsPos: number[][]
    private player: number
    private score: number[] = [0, 0]
    private wonNumber: number
    private bonusField: number[] = [4, 8, 12, 16]
    private warZone: number[] = [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]
    private availableMoves: number[];
    private maxPosition: number = 17
    private respin: boolean;
    cheatIterator: IterableIterator<number>;
    private pawnToKill: number;

    constructor() {
        this.pawnsPos = [new Array(7).fill(0), new Array(7).fill(0)]
        this.player = 0
        this.score = new Array(2).fill(0)
        this.wonNumber = -1
        window['s'] = this

        this.cheatIterator = this.getCheatNumber()
    }

    drawStep(): void {
        this.drawNumber()
        this.availableMoves = this.calculateAvailableMoves()
        this.respin = false
    }

    movePawn(pawnIndex: number) {
        if (this.availableMoves[pawnIndex] > 0) {
            this.pawnsPos[this.player][pawnIndex] = this.availableMoves[pawnIndex]
            this.respin = this.bonusField.includes(this.pawnsPos[this.player][pawnIndex])
            this.pawnToKill = this.calculateOponentToKill(this.pawnsPos[this.player][pawnIndex])

            if (this.availableMoves[pawnIndex] === 17) {
                this.score[this.player] += 1
            }

            if (this.pawnToKill < 0) { return }
            this.pawnsPos[this.getOponent()][this.pawnToKill] = 0
        }
    }

    getPawnToKill(): number[] {
        return [this.getOponent(), this.pawnToKill]
    }

    changePlayer() {
        if (this.respin) { return }
        this.player = this.getOponent()
    }

    getWonNumber(): number {
        return this.wonNumber
    }

    getPlayer(): number {
        return this.player
    }

    getAvailableMoves(): number[] {
        return this.availableMoves
    }

    getScore(): number[] {
        return this.score
    }

    private calculateOponentToKill(posIndex: number): number {
        return !this.warZone.includes(posIndex) ? -1 : this.pawnsPos[this.getOponent()].indexOf(posIndex)
    }

    private getOponent() {
        return this.player > 0 ? 0 : 1
    }

    private drawNumber() {
        this.wonNumber = Math.floor(Math.random() * maxNumber)
        // this.wonNumber = this.cheatIterator.next().value
    }

    private *getCheatNumber(): IterableIterator<number> {
        yield 17
        yield 0
        yield 0
        yield 3
        while (true) {
            yield 0
        }
    }

    private calculateAvailableMoves() {
        let activePawns: number[] = this.pawnsPos[this.player],
            availableMoves: number[] = []

        if (this.wonNumber < 1) {
            return new Array(7).fill(0)
        }

        activePawns.forEach(oldPos => {
            let newPos = oldPos + this.wonNumber

            if (newPos > this.maxPosition) {
                availableMoves.push(0)
                return
            }

            if (newPos !== this.maxPosition && activePawns.includes(newPos)) {
                availableMoves.push(0)
                return
            }

            newPos = this.adjustPosAgainstOponent(newPos)

            if (newPos !== this.maxPosition && activePawns.includes(newPos)) {
                availableMoves.push(0)
                return
            }

            if (oldPos === 0 && availableMoves.includes(newPos)) {
                availableMoves.push(0)
                return
            }

            availableMoves.push(newPos)
        })

        return availableMoves
    }

    private adjustPosAgainstOponent(newPos: number) {
        let oponentPawns: number[] = this.pawnsPos[this.getOponent()]

        if (!this.warZone.includes(newPos)) {
            return newPos
        }

        if (!oponentPawns.includes(newPos) && !oponentPawns.includes(invertedPositions[newPos])) {
            return newPos
        }

        if (!this.bonusField.includes(newPos)) {
            return newPos
        }

        return this.adjustPosAgainstOponent(++newPos)
    }
}
