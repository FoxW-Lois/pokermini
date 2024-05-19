import { Router } from "express";
import { Reception, Game, ActionPlayer } from "./controller" ;
export const usersRouter = Router();

usersRouter.get("/", Reception);
usersRouter.get("/game", Game);
usersRouter.post("/game", ActionPlayer);
