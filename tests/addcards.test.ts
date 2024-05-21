import { describe, it, expect } from 'vitest';
import { addCards } from '../src/users/controller';

describe('addCards', () => {
	it('should add cards correctly', () => {
		const newCardList = addCards();
		expect(newCardList).toHaveLength(12);
		expect(newCardList[0]).toEqual({ id: "A", value: 13, symbol: "♠" });
	});
});
