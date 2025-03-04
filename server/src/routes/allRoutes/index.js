import { Router } from "express";
import userRouter from "../users/userRoutes.js";
import bikeRouter from "../bike/bikeRoutes.js";
import maintenanceRouter from "../maintenanceRecord/maintenanceRecordRoutes.js";
import serviceBookingRouter from "../services/serviceBookingRoutes.js";
import sparePartRouter from "../spareParts/sparePartRoutes.js";
import additionalServiceRouter from "../services/additionalServiceRoutes.js";
import invoiceRouter from "../invoice/invoiceRoutes.js";
import servicePackageRouter from "../services/servicePackageRoutes.js";
import serviceReportRouter from "../services/serviceReportRoutes.js";
import serviceRequestRouter from "../services/serviceRequestRoutes.js";
import serviceSlotRouter from "../services/serviceSlotRoutes.js";
import serviceUpdateRouter from "../services/serviceUpdateRoutes.js";
import authRouter from "../authentication/authenticationRoute.js";
import forgetPasswordRouter from "../users/forgetPasswordRoutes.js";
import updatepasswordRouter from "../users/updatePasswordRoutes.js";
import videoUploadRouter from "../videoUpload/videoUploadRoute.js";
const allRoutes = Router();
allRoutes.use(userRouter);
allRoutes.use(bikeRouter);
allRoutes.use(maintenanceRouter);
allRoutes.use(serviceBookingRouter);
allRoutes.use(sparePartRouter);
allRoutes.use(additionalServiceRouter);
allRoutes.use(invoiceRouter);
allRoutes.use(servicePackageRouter);
allRoutes.use(serviceReportRouter);
allRoutes.use(serviceRequestRouter);
allRoutes.use(serviceSlotRouter);
allRoutes.use(serviceUpdateRouter);
allRoutes.use(authRouter);
allRoutes.use(forgetPasswordRouter);
allRoutes.use(updatepasswordRouter);
allRoutes.use(videoUploadRouter);
export default allRoutes;
