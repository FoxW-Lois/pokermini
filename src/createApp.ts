import express from 'express';
import { card } from './recipes/model';
import { userList, cardList, nextplayer } from './users/controller';

export function createApp() {
	const app = express();
	let game: any = null;
	let hands: any = null;

	app.use(express.static("public"));
	app.set("view engine", "ejs");
	app.set("views", "./views");
	app.use(express.urlencoded({ extended: true }));

    app.get("/", (req, res) => {
		res.render("index", {
			game: game,
			hand: hands?.human,
		});
	});

    app.post("/new-game", (req, res) => {
		hands = {
			human: [],
			bot: [],
		};

		game = {
			balances: {
				human: userList[0].jetons,
				bot: userList[1].jetons,
			},
			hand: {
				stage: "ante",
				currentPlayer: "player1",
				pot: 0,
				bets: {
					player: 0,
					bot: 0,
				},
			},
		};

		game.balances.human -= 1;
		game.hand.pot += 1;
		game.balances.bot -= 1;
		game.hand.pot += 1;

		game.hand.stage = "turn1";

		hands.human = [
			{ rank: "9", suit: "♠" },
			{ rank: "Q", suit: "♠" },
		];

		hands.bot = [
			{ rank: "T", suit: "♥" },
			{ rank: "K", suit: "♠" },
		];

		res.redirect("/");
	});
  
    app.get("/game-status", (req, res) => {
		res.json(game);
	});

	app.post("/play", (req, res) => {
		console.log("test");
		console.log(req.body.action);
		
		if (!game || game.hand.currentPlayer !== "player1") {
			res.redirect("/");
			return;
		}

		switch (req.body.action){
			case "Check" : 
				console.log("A");
				game.hand.currentPlayer = nextplayer(game.hand.currentPlayer);
			break;

			case "Fold" : 
				console.log("B");
				
			break;

			case "Bet" : 
				console.log("C"); 
			break;

			case "Raise" : 
				console.log("D"); 
			break;
		}


		// if (req.body.action === "bet") {
		// 	const amount = parseInt(req.body.bet || "1");
		// 	game.hand.bets.human += amount;
		// 	game.balances.human -= amount;
		// 	game.hand.currentPlayer = "bot";
		// 	setTimeout(() => {
		// 		game.lastAction = "bet";
		// 		game.lastAmount = 1;
		// 		game.balances.bot -= 1;
		// 		game.hand.bets.bot += 1;
		// 		game.hand.currentPlayer = "player1";
		// 	}, 5000);
		// }
		
		res.redirect("/");
	});

	return app;
}
