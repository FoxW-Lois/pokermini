import { usersRouter } from "./users/routes";
import express from "express";
import methodOverride from 'method-override'
import {loadFromHiddenField} from "./middlewares/methodOverride"

const app = express();

app.set("views", "./views");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride(loadFromHiddenField as any))
app.use("/",usersRouter)

app.listen(3000);
