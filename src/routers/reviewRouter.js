import express from "express";
import { review ,reviewRead,reviewCreate,reviewDelete,reviewDeleted,reviewGetEdit,reviewPostEdit, reviewPost} from "../controllers/reviewController.js";

const reviewRouter = express.Router();

reviewRouter.get('/', review); //메인 페이지


export default reviewRouter;



reviewRouter.get('/', review); //메인 페이지
reviewRouter.route("/create").get(reviewCreate).post(reviewPost);
reviewRouter.get("/:id([0-9a-f]{24})", reviewRead)
reviewRouter.route("/:id([0-9a-f]{24})/edit").get(reviewGetEdit).post(reviewPostEdit);
reviewRouter.route("/:id([0-9a-f]{24})/delete").get(reviewDelete).post(reviewDeleted);