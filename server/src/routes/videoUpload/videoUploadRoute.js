// import express from "express";
// import { upload } from "../../middlewares/multer.js"; // adjust the path as needed
// import { uploadFile } from "../../controllers/videoUploadController/videoUploadController.js";

// const videoUploadRouter = express.Router();

// // Define the route that handles the file upload. The field name "file" should match your client-side form.
// videoUploadRouter.post("/upload", upload.single("file"), uploadFile);

// export default videoUploadRouter;


import express from "express";
import { upload } from "../../middlewares/multer.js"; // Ensure the path matches your project structure
import {
  uploadFile,
  getAllFiles,
  getFile,
} from "../../controllers/videoUploadController/videoUploadController.js";

const router = express.Router();

// Route to upload a file
router.post("/upload", upload.single("file"), uploadFile);

// Route to get all uploaded files
router.get("/files", getAllFiles);

// Route to get a specific file by its public_id
router.get("/files/:publicId", getFile);

export default router;
