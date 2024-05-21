import { describe, it, expect, beforeEach } from 'vitest';
import { resetValue, userList, cardList, addCards } from '../src/users/controller';

describe('resetValue', () => {
	beforeEach(() => {
		userList.length = 0;
		cardList.length = 0;

		userList.push({ id: "Player", chips: 100, cardHand: [], currentTurn: true, betCount: 0 });
		userList.push({ id: "Bot", chips: 100, cardHand: [], currentTurn: false, betCount: 0 });

		cardList.push(...addCards());
	});

	it('should reset values correctly', () => {
		resetValue();

		expect(userList).toHaveLength(2);
		expect(userList[0].id).toBe('Player');
		expect(userList[1].id).toBe('Bot');

		expect(userList[0].chips).toBe(99);
		expect(userList[1].chips).toBe(99);

		expect(userList[0].cardHand).toHaveLength(2);
		expect(userList[1].cardHand).toHaveLength(2);

		expect(cardList).toHaveLength(12);
	});
});