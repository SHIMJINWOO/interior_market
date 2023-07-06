// src/routers/rootRouter.js
import express from "express";
import { loginUser,joinUser, service, introduce} from '../controllers/userControllers.js'; 
import { home, join, login } from '../controllers/rootControllers.js'; 
import {protectorMiddleware, publicOnlyMiddleware} from '../middlewares.js';
const rootRouter = express.Router();

rootRouter.get('/', home); //메인 페이지
rootRouter.route('/login').all(publicOnlyMiddleware).get(login).post(loginUser); //로그인
rootRouter.route('/join').all(publicOnlyMiddleware).get(join).post(joinUser); //회원가입
rootRouter.get('/service', service); //서비스소개
rootRouter.get('/introduce', introduce); //시공상품

export default rootRouter;
//import {getJoin,postJoin, getLogin,postLogin} from "../controllers/userController"
//import {home, search} from "../controllers/videoController";
//import {protectorMiddleware, publicOnlyMiddleware} from '../middlewares'
//rootRouter.route("/join").all(publicOnlyMiddleware).get(getJoin).post(postJoin);
//rootRouter.route("/login").all(publicOnlyMiddleware).get(getLogin).post(postLogin);
//rootRouter.get("/search",search);;


