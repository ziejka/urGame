export default interface iClientGameLogic {
    getWonNumberText(): string
    getPlayer(): number
    getWonNumber(): number
    getAvailableMoves(): number[]
    getPawnToKill(): number[]
}
