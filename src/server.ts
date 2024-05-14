import express from 'express';
import { loadFromHiddenField } from './middlewares/methodOverride';
import methodOverride from 'method-override';
import { usersRouter } from './users/routes'

const app = express()

app.set("views", "./views");
app.set("view engine", "ejs");

app.use(express.static("public"))
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride(loadFromHiddenField))

app.use("/",usersRouter);
app.listen(3000);

