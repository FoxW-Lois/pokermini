import { Router } from "express";
import { reception, Game } from "./controller" ;

export const usersRouter = Router();

usersRouter.get("/", reception);
usersRouter.get("/game", Game);
