import express from "express";
import morgan  from "morgan";
import session from 'express-session';
import MongoStore from "connect-mongo";
import rootRouter from "./routers/rootRouter.js"
import reviewRouter from "./routers/reviewRouter.js";
import userRouter from "./routers/userRouter.js";
import portfolioRouter from "./routers/portfolioRouter.js";
import { localsMiddleware } from "./middlewares.js";
import path from 'path';
import fetch from 'node-fetch';

const app = express();
const logger = morgan("dev");

app.set('view engine', 'pug');
app.set("views", process.cwd() + "/src/views");
app.use(logger);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//app.use("/static", express.static("assets"));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 2000000,
  },
  store: MongoStore.create({ mongoUrl: process.env.DB_URL}),
}));


app.use(localsMiddleware);
app.use("/uploads", express.static("uploads"));
app.use("/static", express.static("assets"));
app.use(express.static(path.join(__dirname, '../src/client')));
app.use("/",rootRouter);
app.use("/users",userRouter);
app.use("/portfolio",portfolioRouter);
app.use("/review",reviewRouter);

//app.use("/product",productRouter);
export default app;