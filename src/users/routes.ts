import { Router } from "express";
import { reception, game } from "./controller" ;

export const usersRouter = Router();

usersRouter.get("/", reception);
usersRouter.get("/game", game);
