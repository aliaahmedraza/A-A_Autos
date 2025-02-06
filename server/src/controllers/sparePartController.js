import sparePartModel from "../model/spareparts/index.js";

export const getSpareParts = async (req, res) => {
  try {
    const { category, inStock } = req.query;

    // Build query based on filters
    let query = {};
    if (category) {
      query.category = category;
    }
    if (inStock === "true") {
      query.stockQuantity = { $gt: 0 };
    }

    const spareParts = await sparePartModel
      .find(query)
      .sort({ category: 1, name: 1 });

    res.status(200).json({
      success: true,
      data: spareParts,
    });
  } catch (error) {
    console.error("Error fetching spare parts:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getSparePartById = async (req, res) => {
  try {
    const { id } = req.params;
    const sparePart = await sparePartModel.findById(id);

    if (!sparePart) {
      return res.status(404).json({
        success: false,
        message: "Spare part not found",
      });
    }

    res.status(200).json({
      success: true,
      data: sparePart,
    });
  } catch (error) {
    console.error("Error fetching spare part:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const createSparePart = async (req, res) => {
  try {
    const data = req.body;
    let spareParts;

    // Check if the input is an array or single object
    if (Array.isArray(data)) {
      // Validate each spare part in the array
      for (const part of data) {
        if (part.price < 0) {
          return res.status(400).json({
            success: false,
            message: "Price cannot be negative",
          });
        }

        if (part.stockQuantity < 0) {
          return res.status(400).json({
            success: false,
            message: "Stock quantity cannot be negative",
          });
        }
      }

      // Create multiple spare parts
      spareParts = await sparePartModel.insertMany(data);
      
      res.status(201).json({
        success: true,
        message: `${spareParts.length} spare parts created successfully`,
        data: spareParts,
      });
    } else {
      // Handle single spare part
      if (data.price < 0) {
        return res.status(400).json({
          success: false,
          message: "Price cannot be negative",
        });
      }

      if (data.stockQuantity < 0) {
        return res.status(400).json({
          success: false,
          message: "Stock quantity cannot be negative",
        });
      }

      // Create single spare part
      const sparePart = await sparePartModel.create(data);
      
      res.status(201).json({
        success: true,
        message: "Spare part created successfully",
        data: sparePart,
      });
    }
  } catch (error) {
    console.error("Error creating spare part(s):", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateSparePart = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };

    // Validate price and stock quantity if provided
    if (updateData.price !== undefined && updateData.price < 0) {
      return res.status(400).json({
        success: false,
        message: "Price cannot be negative",
      });
    }

    if (
      updateData.stockQuantity !== undefined &&
      updateData.stockQuantity < 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Stock quantity cannot be negative",
      });
    }

    const sparePart = await sparePartModel.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!sparePart) {
      return res.status(404).json({
        success: false,
        message: "Spare part not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Spare part updated successfully",
      data: sparePart,
    });
  } catch (error) {
    console.error("Error updating spare part:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteSparePart = async (req, res) => {
  try {
    const { id } = req.params;

    const sparePart = await sparePartModel.findById(id);
    if (!sparePart) {
      return res.status(404).json({
        success: false,
        message: "Spare part not found",
      });
    }

    await sparePartModel.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Spare part deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting spare part:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Additional useful endpoints

export const updateStock = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity, operation } = req.body; // operation can be 'add' or 'subtract'

    if (!["add", "subtract"].includes(operation)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid operation. Use "add" or "subtract"',
      });
    }

    const sparePart = await sparePartModel.findById(id);
    if (!sparePart) {
      return res.status(404).json({
        success: false,
        message: "Spare part not found",
      });
    }

    let newQuantity = sparePart.stockQuantity;
    if (operation === "add") {
      newQuantity += quantity;
    } else {
      newQuantity -= quantity;
      if (newQuantity < 0) {
        return res.status(400).json({
          success: false,
          message: "Insufficient stock",
        });
      }
    }

    const updatedPart = await sparePartModel.findByIdAndUpdate(
      id,
      { stockQuantity: newQuantity },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Stock updated successfully",
      data: updatedPart,
    });
  } catch (error) {
    console.error("Error updating stock:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getSparePartsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const spareParts = await sparePartModel
      .find({ category })
      .sort({ name: 1 });

    res.status(200).json({
      success: true,
      data: spareParts,
    });
  } catch (error) {
    console.error("Error fetching spare parts by category:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getLowStockSpareParts = async (req, res) => {
  try {
    const threshold = parseInt(req.query.threshold) || 10; // Default threshold of 10

    const spareParts = await sparePartModel
      .find({
        stockQuantity: { $lte: threshold },
      })
      .sort({ stockQuantity: 1 });

    res.status(200).json({
      success: true,
      data: spareParts,
    });
  } catch (error) {
    console.error("Error fetching low stock spare parts:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
