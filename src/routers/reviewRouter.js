import express from "express";
import { review ,reviewRead,reviewCreate,reviewDelete,reviewDeleted,reviewGetEdit,reviewPostEdit, reviewPost} from "../controllers/reviewController.js";
import {protectorMiddleware, publicOnlyMiddleware, uploadFiles} from '../middlewares.js';

const reviewRouter = express.Router();
reviewRouter.get('/', review); //메인 페이지
reviewRouter.route("/create").all(protectorMiddleware).get(reviewCreate).post(uploadFiles.array("reviewPic",10),reviewPost);
reviewRouter.get("/:id([0-9a-f]{24})", reviewRead)
reviewRouter.route("/:id([0-9a-f]{24})/edit").all(protectorMiddleware).get(reviewGetEdit).post(reviewPostEdit);
reviewRouter.route("/:id([0-9a-f]{24})/delete").all(protectorMiddleware).get(reviewDelete).post(reviewDeleted);
export default reviewRouter;