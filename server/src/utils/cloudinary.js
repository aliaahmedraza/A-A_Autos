import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();
// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "dwa0a5xgk",
  api_key: process.env.CLOUDINARY_API_KEY || 853139748943312,
  api_secret:
    process.env.CLOUDINARY_API_SECRET || "e10V0OMt_LRyutBX9KuxyTb6aw8",
});
const uploadOnCloudinary = async (localFilePath)=>{
    try {
        if (!localFilePath) {
             throw new Error("File URL cannot be empty");
        }
        // Upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        });
        // Uploaded the file on cloudinary successfully
        console.log("Uploaded file on cloudinary successfully",response.url);
        return response;
     } catch (error) {
        fs.unlinkSync(localFilePath) // remove the locally saved temporary file as the upload function got failed
        console.log(error);
        return null;
     }
}
export { uploadOnCloudinary };