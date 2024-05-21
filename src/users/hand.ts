import { card } from '../recipes/model';

export type HandType = "High-Card" | "Pair" | "Suite" | "Flush" | "Suite-Flush";
export type Hand = {
	type : HandType,
	rank : string | undefined,
	kicker : string | undefined,
	cards : card[]
};

export function categorizeHand(cards : card[]) : Hand{
	// Sort cards by increasing value
	cards.sort((a, b) => a.value - b.value);

	// Check different hand types
	if (isFlush(cards) && isSuite(cards)) {
		return { 
			type: "Suite-Flush", 
			rank: cards[cards.length - 1].id, 
			kicker: undefined, 
			cards 
		};
	} else if (isFlush(cards)) {
		return { 
			type: "Flush", 
			rank: cards[cards.length - 1].id, 
			kicker: undefined, 
			cards 
		};
	} else if (isSuite(cards)) {
		return { 
			type: "Suite", 
			rank: cards[cards.length - 1].id, 
			kicker: undefined, 
			cards 
		};
	} else if (hasPair(cards)) {
		return { 
			type: "Pair", 
			rank: getPairRank(cards), 
			kicker: getKicker(cards), 
			cards 
		};
	} else {
		return { 
			type: "High-Card", 
			rank: cards[cards.length - 1].id, 
			kicker: undefined, 
			cards 
	};
	}
};

// Check if hand is suite
function isSuite(cards: card[]): boolean {
	for (let i = 1; i < cards.length; i++) {
		if (cards[i].value !== cards[i - 1].value + 1) {
			return false;
		}
	}
	return true;
}

// Check if hand is flush (color)
function isFlush(cards: card[]): boolean {
	const symbol = cards[0].symbol;
	return cards.every(card => card.symbol === symbol);
}

// Check if hand is paire
function hasPair(cards: card[]): boolean {
	for (let i = 1; i < cards.length; i++) {
		if (cards[i].value === cards[i - 1].value) {
			return true;
		}
	}
	return false;
}

// Get pair rank
function getPairRank(cards: card[]): string | undefined {
	for (let i = 1; i < cards.length; i++) {
		if (cards[i].value === cards[i - 1].value) {
			return cards[i].id;
		}
	}
	return undefined;
}

// Get kicker
function getKicker(cards: card[]): string | undefined {
	const pairValue = getPairRank(cards);
	for (let i = cards.length - 1; i >= 0; i--) {
		if (cards[i].id !== pairValue) {
			return cards[i].id;
		}
	}
	return undefined;
}


function getHandRank(hand: Hand): number {
	switch (hand.type) {
		case 'Pair':
			return 2;

		case 'Suite':
			return 3;

		case 'Flush':
			return 4;

		case 'Suite-Flush':
			return 5;

		default: //High-Card
			return 1;
	}
}

export function compareHand(hand1 : Hand, hand2 : Hand) : string{
	let hand1Rank = getHandRank(hand1);
	let hand2Rank = getHandRank(hand2);
	let winner: string = "No player";

	if (hand1Rank > hand2Rank) {
		console.log("Player win");
		winner = "Player";
	}
	else if (hand1Rank < hand2Rank) {
		console.log("Bot win");
		winner = "Bot";
	}
	else if (hand1Rank == hand2Rank) {
		let hand1StrongestCard: card | null = hand1.cards[0];
		for (const card of hand1.cards) {
			if (card.value > hand1StrongestCard!.value) {
				hand1StrongestCard = card;
			}
		}

		let hand2StrongestCard: card | null = hand1.cards[0];
		for (const card of hand2.cards) {
			if (card.value > hand2StrongestCard!.value) {
				hand2StrongestCard = card;
			}
		}

		if (hand1StrongestCard > hand2StrongestCard) {
			console.log("Player win");
			winner = "Player";
		}
		else if (hand1StrongestCard < hand2StrongestCard) {
			console.log("Bot win");
			winner = "Bot";
		}
	}
	else {
		console.log("No player win");
		winner = "No player";
	}
	return winner;
};
