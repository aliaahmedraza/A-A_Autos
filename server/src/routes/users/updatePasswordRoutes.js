import express from "express";
import updatePasswordController from "../../controllers/users/updatePasswordController.js";
const updatepasswordRouter = express.Router();
updatepasswordRouter.put("/updatepassword/:token", updatePasswordController);
export default updatepasswordRouter;
