import { RequestHandler } from "express";
import { card, user } from '../recipes/model';
import { categorizeHand, compareHand } from "./hand";

export const Reception : RequestHandler = (req, res) => {
	res.render("index");
};

export const Game : RequestHandler = (req, res) => {
	res.render('game', {userList, cardList, pot, botTurn, turnPlayer, turnForCard});
};

export let userList : user[] = [];
export let cardList : card[] = [];
let turnPlayer: number=1;
let turnForCard: number=1;

export function resetValue() {
	let cardHand1: card[]=[];
	let newRandomCard = giveRandomCard();
	cardHand1.push(newRandomCard);
	newRandomCard = giveRandomCard();
	cardHand1.push(newRandomCard);

	let cardHand2: card[]=[];
	newRandomCard = giveRandomCard();
	cardHand2.push(newRandomCard);
	newRandomCard = giveRandomCard();
	cardHand2.push(newRandomCard);

	let chips1 = userList[0].chips - 1;
	let chips2 = userList[1].chips - 1;

	userList[0].currentTurn = !userList[0].currentTurn;
	let currentTurn1 = userList[0].currentTurn;
	let indicateIfBotStartsTheGame = !userList[1].currentTurn;

	userList = [];
	let player : user = {id: "Player", chips: chips1, cardHand : cardHand1, currentTurn: currentTurn1, betCount: 0};
	userList.push(player);
	let bot = {id: "Bot", chips: chips2, cardHand : cardHand2, currentTurn: indicateIfBotStartsTheGame, betCount: 0};
	userList.push(bot);

	cardList = addCards();
	turnPlayer = 1;
	turnForCard = 1;
	pot = 2;
}

// symbols : ♠ ♥ ♦ ♣

export function addCards() : card[] {
	// cards ♠
	let cardList = [{ id: "A", value: 13, symbol: "♠" },
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
	{ id: "9", value: 8, symbol: "♥" }];

	return cardList;
}

cardList = addCards();

export function giveRandomCard() {
	let index = Math.floor(Math.random() * cardList.length);
	let cardGived = cardList[index];
	cardList.splice(index, 1);

	return cardGived;
}

let cardHand1: card[]=[];
let newRandomCard = giveRandomCard();
cardHand1.push(newRandomCard);
newRandomCard = giveRandomCard();
cardHand1.push(newRandomCard);

let cardHand2: card[]=[];
newRandomCard = giveRandomCard();
cardHand2.push(newRandomCard);
newRandomCard = giveRandomCard();
cardHand2.push(newRandomCard);

let player : user = {id: "Player",
	chips: 100,
	cardHand : cardHand1,
	currentTurn: true,
	betCount: 0
};
userList.push(player);

let bot = {id: "Bot",
	chips: 100,
	cardHand : cardHand2,
	currentTurn: false,
	betCount: 0
};
userList.push(bot);

// console.log(cardList);
// console.log(userList[0].cardHand[0]);
// console.log(userList[0].cardHand[1]);
// console.log(userList[1].cardHand[0]);
// console.log(userList[1].cardHand[1]);


export function botTurn() {
	let optionsList = [""];

	if (turnPlayer === 1 || (userList[0].betCount === 0 && userList[1].betCount === 0)) {
		optionsList = ["Check","Bet1","Bet2"];
		
	} else if (turnPlayer === 2 && userList[1].betCount === 0 && userList[0].betCount !== 0) {
		optionsList = ["Call","Raise","Fold"];
		
	} else {
		optionsList = ["Call","Fold"];
	}

	let index = Math.floor(Math.random() * optionsList.length);
	
	switch (optionsList[index]) {
		case 'Check':
			userList[0].currentTurn = !userList[0].currentTurn;
			turnPlayer++;
			console.log("Bot Check");
		break;

		case 'Raise':
			userList[0].currentTurn = !userList[0].currentTurn;
			userList[1].betCount += userList[0].betCount+1;
			userList[1].chips -= userList[1].betCount;
			pot += userList[1].betCount;
			turnPlayer++;
			console.log("Bot Raise");
		break;

		case 'Bet1':
			userList[0].currentTurn = !userList[0].currentTurn;
			userList[1].chips = userList[1].chips - 1;
			userList[1].betCount += 1;
			pot += userList[1].betCount;
			turnPlayer++;
			console.log("Bot Bet1");
		break;

		case 'Bet2':
			userList[0].currentTurn = !userList[0].currentTurn;
			userList[1].chips = userList[1].chips - 2;
			userList[1].betCount += 2;
			pot += userList[1].betCount;
			turnPlayer++;
			console.log("Bot Bet2");
		break;

		case 'Fold':
			console.log("Bot Fold");
			userList[0].currentTurn = !userList[0].currentTurn;
			console.log("Game finish, Player win by opponent fold");
			userList[0].chips += pot;
			resetValue();
		break;

		case 'Call':
			console.log("Bot Call");
			userList[0].currentTurn = !userList[0].currentTurn;
			userList[1].betCount = userList[0].betCount;
			userList[1].chips -= userList[1].betCount;
			pot += userList[1].betCount;
			turnPlayer++;
		break;
	}

	if (turnPlayer === 3) {
		// give one card to player and bot
		newRandomCard = giveRandomCard();
		cardHand1.push(newRandomCard);

		newRandomCard = giveRandomCard();
		cardHand2.push(newRandomCard);

		turnForCard = 2;
		// userList[0].betCount=0;
		// userList[1].betCount=0;
		
		// console.log(userList[0].cardHand);
		// console.log(userList[1].cardHand);
	}

	if (turnPlayer === 4) {
		console.log(userList[0].cardHand);
		console.log(userList[1].cardHand);

		let playerhand = categorizeHand(userList[0].cardHand);
		let bothand = categorizeHand(userList[1].cardHand);
		compareHand(playerhand, bothand);
		// console.log("playerhand ="+ playerhand);
		// console.log("bothand ="+ bothand);
		// console.log(compareHand(playerhand, bothand));
		resetValue();
	}
}


let stackinitial = userList[0].chips + userList[1].chips;
userList[0].chips -= 1;
userList[1].chips -= 1;

let pot = stackinitial - (userList[0].chips+userList[1].chips);
// console.log(cardList);
// console.log(userList[0].cardHand)


export const ActionPlayer : RequestHandler = (req, res) => {
	switch (req.body.action) {
		case 'Check':
			userList[0].currentTurn = !userList[0].currentTurn;
			turnPlayer++;
		break;

		case 'Raise':
			userList[0].currentTurn = !userList[0].currentTurn;
			userList[0].betCount += userList[1].betCount+1;
			userList[0].chips -= userList[0].betCount;
			pot += userList[1].betCount;
			turnPlayer++;
		break;

		case 'Bet1':
			userList[0].currentTurn = !userList[0].currentTurn;
			userList[0].chips = userList[0].chips - 1;
			userList[0].betCount += 1;
			pot += userList[0].betCount;
			turnPlayer++;
		break;

		case 'Bet2':
			userList[0].currentTurn = !userList[0].currentTurn;
			userList[0].chips = userList[0].chips - 2;
			userList[0].betCount += 2;
			pot += userList[0].betCount;
			turnPlayer++;
		break;

		case 'Fold':
			userList[0].currentTurn = !userList[0].currentTurn;
			console.log("Game finish, Bot win by opponent fold");
			userList[1].chips += pot;
			resetValue();
		break;

		case 'Call':
			userList[0].currentTurn = !userList[0].currentTurn;
			userList[0].betCount = userList[1].betCount;
			userList[0].chips -= userList[0].betCount;
			pot += userList[0].betCount;
			turnPlayer++;
			console.log("player turnPlayer : " +turnPlayer);
		break;
	}

	if (turnPlayer === 3) {
		// Give one card to player and bot
		newRandomCard = giveRandomCard();
		cardHand1.push(newRandomCard);

		newRandomCard = giveRandomCard();
		cardHand2.push(newRandomCard);

		turnForCard = 2;
		// userList[0].betCount=0;
		// userList[1].betCount=0;
		
		// console.log(userList[0].cardHand);
		// console.log(userList[1].cardHand);
	}

	if (turnPlayer === 4) {
		console.log(userList[0].cardHand);
		console.log(userList[1].cardHand);

		let playerhand = categorizeHand(userList[0].cardHand);
		let bothand = categorizeHand(userList[1].cardHand);
		compareHand(playerhand, bothand);
		// console.log("playerhand ="+ playerhand);
		// console.log("bothand ="+ bothand);
		// console.log(compareHand(playerhand, bothand));
		resetValue();
	}

	res.redirect("/game");
}
