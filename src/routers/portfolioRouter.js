import express from "express";
import { portfolio ,portfolioRead,portfolioCreate,portfolioDelete} from "../controllers/portfolioController.js";

const portfolioRouter = express.Router();

portfolioRouter.get('/', portfolio); //메인 페이지
portfolioRouter.get("/:id(\\d+)", portfolioRead)
portfolioRouter.get("/:id(\\d+)/write", portfolioCreate)
portfolioRouter.get("/:id(\\d+)/delete", portfolioDelete)

export default portfolioRouter;