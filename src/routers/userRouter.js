import express from "express";
import { startNaverLogin, callbackNaverLogin,logOut, userGetEdit, userPostEdit, getChangePassword, postChangePassword, profileRead } from '../controllers/userControllers.js';
import {protectorMiddleware, publicOnlyMiddleware} from '../middlewares.js';
const userRouter = express.Router();

userRouter.get('/logout',protectorMiddleware, logOut);
userRouter.route("/edit-profile").all(protectorMiddleware).get(userGetEdit).post(userPostEdit);
userRouter.route('/naver').get(publicOnlyMiddleware,startNaverLogin);
userRouter.get('/naver/callback', publicOnlyMiddleware,callbackNaverLogin);
userRouter.route("/change-password").all(protectorMiddleware).get(getChangePassword).post(postChangePassword);
userRouter.route("/:id([0-9a-f]{24})").get(profileRead)
export default userRouter;
//userRouter.get("/:id",see);
