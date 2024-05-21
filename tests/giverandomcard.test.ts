import { describe, it, expect, beforeEach } from 'vitest';
import { giveRandomCard, cardList, addCards } from '../src/users/controller';

describe('giveRandomCard', () => {
	beforeEach(() => {
		cardList.length = 0;
		cardList.push(...addCards());
	});

	it('should give a random card and remove it from cardList', () => {
		const initialCardListLength = cardList.length;
		const randomCard = giveRandomCard();
		expect(randomCard).toBeDefined();
		expect(cardList).toHaveLength(initialCardListLength - 1);
		expect(cardList).not.toContain(randomCard);
	});
});
