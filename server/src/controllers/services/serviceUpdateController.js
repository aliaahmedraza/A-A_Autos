import serviceUpdateModel from "../../model/serviceUpdate/index.js";
import serviceBookingModel from "../../model/serviceBooking/index.js";

export const getServiceUpdates = async (req, res) => {
  try {
    const { requiresApproval, userApproved } = req.query;

    // Build query based on filters
    let query = {};
    if (requiresApproval !== undefined) {
      query.requiresApproval = requiresApproval === "true";
    }
    if (userApproved !== undefined) {
      query.userApproved = userApproved === "true";
    }

    const serviceUpdates = await serviceUpdateModel
      .find(query)
      .populate({
        path: "serviceBooking",
        populate: [
          { path: "user", select: "username email" },
          { path: "bike", select: "model brand registrationNumber" },
        ],
      })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: serviceUpdates,
    });
  } catch (error) {
    console.error("Error fetching service updates:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getServiceUpdateById = async (req, res) => {
  try {
    const { id } = req.params;
    const serviceUpdate = await serviceUpdateModel.findById(id).populate({
      path: "serviceBooking",
      populate: [
        { path: "user", select: "username email" },
        { path: "bike", select: "model brand registrationNumber" },
        { path: "servicePackage", select: "name" },
        { path: "additionalServices", select: "name" },
      ],
    });

    if (!serviceUpdate) {
      return res.status(404).json({
        success: false,
        message: "Service update not found",
      });
    }

    res.status(200).json({
      success: true,
      data: serviceUpdate,
    });
  } catch (error) {
    console.error("Error fetching service update:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const createServiceUpdate = async (req, res) => {
  try {
    const { serviceBooking, description, mediaUrls, requiresApproval } =
      req.body;

    // Check if service booking exists
    const booking = await serviceBookingModel.findById(serviceBooking);
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Service booking not found",
      });
    }

    // Validate media URLs if provided
    if (mediaUrls) {
      const validUrls = mediaUrls.every((url) => {
        try {
          new URL(url);
          return true;
        } catch {
          return false;
        }
      });

      if (!validUrls) {
        return res.status(400).json({
          success: false,
          message: "Invalid media URL format",
        });
      }
    }

    const serviceUpdate = await serviceUpdateModel.create({
      serviceBooking,
      description,
      mediaUrls: mediaUrls || [],
      requiresApproval: requiresApproval || false,
      userApproved: false,
    });

    const populatedUpdate = await serviceUpdate.populate({
      path: "serviceBooking",
      populate: [
        { path: "user", select: "username email" },
        { path: "bike", select: "model brand registrationNumber" },
      ],
    });

    res.status(201).json({
      success: true,
      message: "Service update created successfully",
      data: populatedUpdate,
    });
  } catch (error) {
    console.error("Error creating service update:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateServiceUpdate = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };

    // Prevent updating serviceBooking reference
    delete updateData.serviceBooking;

    // Validate media URLs if provided
    if (updateData.mediaUrls) {
      const validUrls = updateData.mediaUrls.every((url) => {
        try {
          new URL(url);
          return true;
        } catch {
          return false;
        }
      });

      if (!validUrls) {
        return res.status(400).json({
          success: false,
          message: "Invalid media URL format",
        });
      }
    }

    const serviceUpdate = await serviceUpdateModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .populate({
        path: "serviceBooking",
        populate: [
          { path: "user", select: "username email" },
          { path: "bike", select: "model brand registrationNumber" },
        ],
      });

    if (!serviceUpdate) {
      return res.status(404).json({
        success: false,
        message: "Service update not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Service update updated successfully",
      data: serviceUpdate,
    });
  } catch (error) {
    console.error("Error updating service update:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteServiceUpdate = async (req, res) => {
  try {
    const { id } = req.params;

    const serviceUpdate = await serviceUpdateModel.findById(id);
    if (!serviceUpdate) {
      return res.status(404).json({
        success: false,
        message: "Service update not found",
      });
    }

    // Prevent deletion if update requires approval and has been approved
    if (serviceUpdate.requiresApproval && serviceUpdate.userApproved) {
      return res.status(400).json({
        success: false,
        message: "Cannot delete approved service update",
      });
    }

    await serviceUpdateModel.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Service update deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting service update:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Additional useful endpoints

export const updateApprovalStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { approved } = req.body;

    const serviceUpdate = await serviceUpdateModel.findById(id);
    if (!serviceUpdate) {
      return res.status(404).json({
        success: false,
        message: "Service update not found",
      });
    }

    if (!serviceUpdate.requiresApproval) {
      return res.status(400).json({
        success: false,
        message: "This update does not require approval",
      });
    }

    const updatedServiceUpdate = await serviceUpdateModel
      .findByIdAndUpdate(id, { userApproved: approved }, { new: true })
      .populate({
        path: "serviceBooking",
        populate: [
          { path: "user", select: "username email" },
          { path: "bike", select: "model brand registrationNumber" },
        ],
      });

    res.status(200).json({
      success: true,
      message: `Service update ${
        approved ? "approved" : "rejected"
      } successfully`,
      data: updatedServiceUpdate,
    });
  } catch (error) {
    console.error("Error updating approval status:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getServiceUpdatesByBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;

    const serviceUpdates = await serviceUpdateModel
      .find({ serviceBooking: bookingId })
      .populate({
        path: "serviceBooking",
        populate: [
          { path: "user", select: "username email" },
          { path: "bike", select: "model brand registrationNumber" },
        ],
      })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: serviceUpdates,
    });
  } catch (error) {
    console.error("Error fetching service updates for booking:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getPendingApprovals = async (req, res) => {
  try {
    const serviceUpdates = await serviceUpdateModel
      .find({
        requiresApproval: true,
        userApproved: false,
      })
      .populate({
        path: "serviceBooking",
        populate: [
          { path: "user", select: "username email" },
          { path: "bike", select: "model brand registrationNumber" },
        ],
      })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: serviceUpdates,
    });
  } catch (error) {
    console.error("Error fetching pending approvals:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
