export type card = {
    id: string,
    value: number,
    symbol: string
};

export type user = {
    id: string,
    jetons: number,
    cardName: string,
    cardValue: number,
    currentTurn: boolean
}
