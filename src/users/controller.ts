import { RequestHandler } from "express";

export const reception : RequestHandler = (req, res) => {
    res.render("index")
}

export const game : RequestHandler = (req, res) => {
    res.render("game")
}
