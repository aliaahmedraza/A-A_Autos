import express from "express";
import forgetPasswordController from "../../controllers/users/forgetPasswordController.js";
const forgetPasswordRouter = express.Router();
forgetPasswordRouter.post("/forgetpassword", forgetPasswordController);
export default forgetPasswordRouter;