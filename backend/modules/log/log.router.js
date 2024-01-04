
import express from "express";
import logController from "./log.controller.js";
import postValidate from "../../helper/postvalidate.js";
import logValidation from "./log.validation.js"
import logHelper from "./log.helper.js";

const logRouter=express.Router();

logRouter.post("/storeLog",logValidation.logBody,postValidate,logController.storeLog);
logRouter.get("/search",logController.filter);

export default logRouter;



