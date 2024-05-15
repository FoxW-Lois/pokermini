import { RequestHandler } from "express";
import { card, stack, user } from '../recipes/model';

export const reception : RequestHandler = (req, res) => {
    res.render("index")
};

export const game : RequestHandler = (req, res) => {
    res.render("game")
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


let index = Math.floor(Math.random() * cardList.length);
let randomCard = cardList[index].id+cardList[index].symbol;
let valueCard = cardList[index].value;
cardList.splice(index, 1);

let index2 = Math.floor(Math.random() * cardList.length);
randomCard = cardList[index2].id+cardList[index2].symbol;
valueCard = cardList[index2].value;
cardList.splice(index2, 1);


let player : user = {
    id: "Player",
    jetons: 100,
    cardName: randomCard,
    cardValue: valueCard,
    currentTurn: true
};
userList.push(player);

player = {
    id: "Bot",
    jetons: 100,
    cardName: randomCard,
    cardValue: valueCard,
    currentTurn: false
};
userList.push(player);


console.log(cardList);

console.log(userList[0].cardName+""+userList[0].cardValue);
console.log(userList[1].cardName+""+userList[1].cardValue);


