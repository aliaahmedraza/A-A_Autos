// import { uploadOnCloudinary } from "../../utils/cloudinary.js"; // adjust the path as needed

// export const uploadFile = async (req, res) => {
//   try {
//     // Check if a file was uploaded by multer
//     if (!req.file) {
//       return res.status(400).json({ error: "No file uploaded" });
//     }

//     // Get the local file path from the multer middleware
//     const localFilePath = req.file.path;

//     // Upload the file to Cloudinary
//     const result = await uploadOnCloudinary(localFilePath);

//     // If the upload failed, send an error response
//     if (!result) {
//       return res.status(500).json({ error: "Cloudinary upload failed" });
//     }

//     // Send a successful response with the URL from Cloudinary
//     res.status(200).json({
//       message: "File uploaded successfully",
//       url: result.url,
//     });
//   } catch (error) {
//     console.error("Error uploading file:", error);
//     res.status(500).json({ error: "Server error", details: error.message });
//   }
// };
import { uploadOnCloudinary } from "../../utils/cloudinary.js";
import { v2 as cloudinary } from "cloudinary";

// Endpoint to upload a file using Multer and then Cloudinary
export const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    const localFilePath = req.file.path;
    const result = await uploadOnCloudinary(localFilePath);
    if (!result) {
      return res.status(500).json({ error: "Cloudinary upload failed" });
    }
    return res.status(200).json({
      message: "File uploaded successfully",
      url: result.url,
      public_id: result.public_id, // Useful for future retrieval or deletion
    });
  } catch (error) {
    console.error("Error uploading file:", error);
    return res
      .status(500)
      .json({ error: "Server error", details: error.message });
  }
};

// Endpoint to retrieve all files uploaded on Cloudinary (using 'raw' as resource_type)
export const getAllFiles = async (req, res) => {
  try {
    // Use resource_type "raw" if your files are being uploaded as raw files
    const result = await cloudinary.api.resources({ resource_type: "raw" });
    return res.status(200).json(result);
  } catch (error) {
    console.error("Error retrieving files:", error);
    return res.status(500).json({ error: "Server error", details: error });
  }
};

// Endpoint to retrieve a specific file's details from Cloudinary using its public_id (using 'raw' as resource_type)
export const getFile = async (req, res) => {
  try {
    const { publicId } = req.params;
    const result = await cloudinary.api.resource(publicId, {
      resource_type: "raw",
    });
    return res.status(200).json(result);
  } catch (error) {
    console.error("Error retrieving file:", error);
    return res.status(500).json({ error: "Server error", details: error });
  }
};
