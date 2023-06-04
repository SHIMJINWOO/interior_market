import express from "express";
import morgan  from "morgan";
import rootRouter from "./routers/rootRouter.js"
import reviewRouter from "./routers/reviewRouter.js";
import portfolioRouter from "./routers/portfolioRouter.js";
import path from 'path';
import session from 'express-session';
import User from './models/User.js';
import fetch from 'node-fetch';

const app = express();
const logger = morgan("dev");

app.set('view engine', 'pug');
app.set("views", process.cwd() + "/src/views");

app.use(logger);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//app.use(session({
//  secret: process.env.SESSION_SECRET,
//  resave: false,
//  saveUninitialized: false,
  //store: MongoStore.create({ mongoUrl: process.env.DB_URL }),
//}));

app.use("/",rootRouter);
app.use("/portfolio",portfolioRouter);
app.use("/review",reviewRouter);

//app.use("/product",productRouter);
export default app;