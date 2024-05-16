import { RequestHandler } from "express";
import { card, user } from '../recipes/model';

export const reception : RequestHandler = (req, res) => {
    res.render("index")
};


export const userList : user[]=[];
export const cardList : card[]=[];

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
let RC = giveRandomCard();
cardHand1.push(RC);
RC = giveRandomCard();
cardHand1.push(RC);

let cardHand2: card[]=[];
RC = giveRandomCard();
cardHand2.push(RC);
RC = giveRandomCard();
cardHand2.push(RC);

let player : user = {
    id: "Player",
    jetons: 100,
    cardHand : cardHand1,
    currentTurn: true
};
userList.push(player);

player = {
    id: "Bot",
    jetons: 100,
    cardHand : cardHand2,
    currentTurn: false
};
userList.push(player);


console.log(cardList);

console.log(userList[0].cardHand[0]);
console.log(userList[0].cardHand[1]);

console.log(userList[1].cardHand[0]);
console.log(userList[1].cardHand[1]);


export const Game : RequestHandler = (req, res) => {
    res.render('game', {userList, cardList})
}

export const Button : RequestHandler = (req, res) => {
    // switch (req.body.action){
    //     case "Check" : 
    //         console.log("A");
    //         game.hand.currentPlayer = nextplayer(game.hand.currentPlayer);
    //     break;

    //     case "Fold" : 
    //         console.log("B");
            
    //     break;

    //     case "Bet" : 
    //         console.log("C"); 
    //     break;

    //     case "Raise" : 
    //         console.log("D"); 
    //     break;
    // }
}


export function nextplayer(currentplayer : string){
    if (currentplayer == "Player") {
        currentplayer = "Bot";
    } 
    else {
        currentplayer = "Player";
    }
}
