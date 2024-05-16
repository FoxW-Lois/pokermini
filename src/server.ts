import { createApp } from "./createApp";
import { usersRouter } from "./users/routes";
import express from "express";
import methodOverride from 'method-override'
import {loadFromHiddenField} from "./middlewares/methodOverride"

const app = createApp();
const ex = express();

ex.set("views", "./views");
ex.set("view engine", "ejs");
ex.use(express.static("public"));
ex.use(express.urlencoded({extended: true}));
ex.use(methodOverride(loadFromHiddenField as any))
ex.use("/",usersRouter)

ex.listen(3000);

