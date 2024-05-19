export type card = {
    id: string,
    value: number,
    symbol: string
};

export type user = {
    id: string,
    chips: number,
    cardHand : card[],
    currentTurn: boolean,
    betCount: number
}
