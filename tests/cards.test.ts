import { describe, it, expect, beforeEach, vi } from 'vitest';
import { giveRandomCard } from '../src/users/controller'; // Modifiez le chemin vers votre module
import { card } from '../src/recipes/model';

let cardList: card[] = [];

beforeEach(() => {
	cardList = [
    { id: "A", value: 13, symbol: "♠" },
    { id: "K", value: 12, symbol: "♠" },
    { id: "Q", value: 11, symbol: "♠" },
    { id: "J", value: 10, symbol: "♠" },
    { id: "10", value: 9, symbol: "♠" },
    { id: "9", value: 8, symbol: "♠" },
    { id: "A", value: 13, symbol: "♥" },
    { id: "K", value: 12, symbol: "♥" },
    { id: "Q", value: 11, symbol: "♥" },
    { id: "J", value: 10, symbol: "♥" },
    { id: "10", value: 9, symbol: "♥" },
    { id: "9", value: 8, symbol: "♥" }
];
});

describe('giveRandomCard', () => {
	it('should return a card from the cardList', () => {
		const card = giveRandomCard();
		expect([{ id: "A", value: 13, symbol: "♠" },
			    { id: "K", value: 12, symbol: "♠" },
			    { id: "Q", value: 11, symbol: "♠" },
			    { id: "J", value: 10, symbol: "♠" },
			    { id: "10", value: 9, symbol: "♠" },
			    { id: "9", value: 8, symbol: "♠" },
			    { id: "A", value: 13, symbol: "♥" },
			    { id: "K", value: 12, symbol: "♥" },
			    { id: "Q", value: 11, symbol: "♥" },
			    { id: "J", value: 10, symbol: "♥" },
			    { id: "10", value: 9, symbol: "♥" },
			    { id: "9", value: 8, symbol: "♥" }]).toContain(card);
	});

	it('should remove the returned card from the cardList', () => {
		const initialLength = cardList.length;
		const card = giveRandomCard();
		expect(cardList.length).toBe(initialLength - 1);
		expect(cardList).not.toContain(card);
	});

	it('should return undefined if the cardList is empty', () => {
		// Empty the cardList
		const card = giveRandomCard();
		expect(card).toBeUndefined();
	});

	it('should modify the original cardList array', () => {
		const originalCardList = [...cardList];
		const card = giveRandomCard();
		expect(cardList).not.toEqual(originalCardList);
	});
});
