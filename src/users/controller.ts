import { RequestHandler } from "express";
import { card, user } from '../recipes/model';

export const Reception : RequestHandler = (req, res) => {
	res.render("index");
};

export const Game : RequestHandler = (req, res) => {
	res.render('game', {userList, cardList, pot, botTurn, switchTurn, gameTurn});
}

export const userList : user[] = [];
export const cardList : card[] = [];
let switchTurn: number=1;
let gameTurn: number=1;

// symbols : ♠ ♥ ♦ ♣

// cards ♠
let Card : card = {
	id: "A",
	value: 13,
	symbol: "♠"
};
cardList.push(Card);

Card = {
	id: "K",
	value: 12,
	symbol: "♠"
};
cardList.push(Card);

Card = {
	id: "Q",
	value: 11,
	symbol: "♠"
};
cardList.push(Card);

Card = {
	id: "J",
	value: 10,
	symbol: "♠"
};
cardList.push(Card);

Card = {
	id: "10",
	value: 9,
	symbol: "♠"
};
cardList.push(Card);

Card = {
	id: "9",
	value: 8,
	symbol: "♠"
};
cardList.push(Card);


// cards ♥
Card = {
	id: "A",
	value: 13,
	symbol: "♥"
};
cardList.push(Card);

Card = {
	id: "K",
	value: 12,
	symbol: "♥"
};
cardList.push(Card);

Card = {
	id: "Q",
	value: 11,
	symbol: "♥"
};
cardList.push(Card);

Card = {
	id: "J",
	value: 10,
	symbol: "♥"
};
cardList.push(Card);

Card = {
	id: "10",
	value: 9,
	symbol: "♥"
};
cardList.push(Card);

Card = {
	id: "9",
	value: 8,
	symbol: "♥"
};
cardList.push(Card);


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

let player : user = {
	id: "Player",
	chips: 100,
	cardHand : cardHand1,
	currentTurn: true,
	betCount: 0
};
userList.push(player);

let bot = {
	id: "Bot",
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

	if (userList[0].betCount === 0 && userList[1].betCount === 0) {
		optionsList = ["Check","Bet1","Bet2"];

	} else if (switchTurn === 2 && userList[0].betCount > userList[1].betCount && userList[1].betCount === 0) {
		optionsList = [ "Call","Raise","Fold"];
		
	} else {
		optionsList = ["Call","Fold"];
	}
	console.log(optionsList);

	let index = Math.floor(Math.random() * optionsList.length);
	console.log(index);
	console.log(optionsList[index]);

	
	switch (optionsList[index]) {
		case 'Check':
			userList[0].currentTurn = true;
			switchTurn++;
		break;

		case 'Raise':
			userList[0].currentTurn = true;
			userList[1].betCount += userList[0].betCount*2;
			userList[1].chips = userList[1].chips - userList[1].betCount;
			pot += userList[1].betCount;
		break;

		case 'Bet1':
			userList[0].currentTurn = true;
			userList[1].chips = userList[1].chips - 1;
			userList[1].betCount += 1;
			pot += userList[1].betCount;
		break;

		case 'Bet2':
			userList[0].currentTurn = true;
			userList[1].chips = userList[1].chips - 2;
			userList[1].betCount += 2;
			pot += userList[1].betCount;
		break;

		case 'Fold':
			userList[0].currentTurn = true;
		break;

		case 'Call':
			userList[0].currentTurn = true;
			userList[1].betCount = userList[0].betCount;
			userList[1].chips -= userList[1].betCount;
			pot += userList[1].betCount;
			switchTurn++;
		break;
	}

	if (switchTurn === 3) {
		// give one card to player and bot
		newRandomCard = giveRandomCard();
		cardHand1.push(newRandomCard);

		newRandomCard = giveRandomCard();
		cardHand2.push(newRandomCard);

		gameTurn = 2;
		userList[0].betCount=0;
		userList[1].betCount=0;
		
		// console.log(userList[0].cardHand);
		// console.log(userList[1].cardHand);
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
			userList[0].currentTurn = false;
			switchTurn++;
		break;

		case 'Raise':
			userList[0].currentTurn = false;
			userList[0].betCount += userList[1].betCount*2;
			userList[0].chips = userList[0].chips - userList[0].betCount;
			pot += userList[1].betCount;
		break;

		case 'Bet1':
			userList[0].currentTurn = false;
			userList[0].chips = userList[0].chips - 1;
			userList[0].betCount += 1;
			pot += userList[0].betCount;
			switchTurn++;
		break;

		case 'Bet2':
			userList[0].currentTurn = false;
			userList[0].chips = userList[0].chips - 2;
			userList[0].betCount += 2;
			pot += userList[0].betCount;
			switchTurn++;
		break;

		case 'Fold':
			userList[0].currentTurn = false;
		break;

		case 'Call':
			userList[0].currentTurn = false;
			userList[0].betCount = userList[1].betCount;
			userList[0].chips -= userList[0].betCount;
			pot += userList[0].betCount;
			switchTurn++;
		break;
	}

	if (switchTurn === 3) {
		// Give one card to player and bot
		newRandomCard = giveRandomCard();
		cardHand1.push(newRandomCard);

		newRandomCard = giveRandomCard();
		cardHand2.push(newRandomCard);

		gameTurn = 2;
		userList[0].betCount=0;
		userList[1].betCount=0;
		
		// console.log(userList[0].cardHand);
		// console.log(userList[1].cardHand);
	}

	console.log(req.body.action);
	console.log(userList[0].currentTurn);
	res.redirect("/game"); // /index/game
}
