import invoiceModel from "../../model/invoice/index.js";
import serviceBookingModel from "../../model/serviceBooking/index.js";

export const getInvoices = async (req, res) => {
  try {
    const { paymentStatus } = req.query;

    // Build query based on filters
    let query = {};
    if (paymentStatus) {
      query.paymentStatus = paymentStatus;
    }

    const invoices = await invoiceModel
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
      data: invoices,
    });
  } catch (error) {
    console.error("Error fetching invoices:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getInvoiceById = async (req, res) => {
  try {
    const { id } = req.params;
    const invoice = await invoiceModel.findById(id).populate({
      path: "serviceBooking",
      populate: [
        { path: "user", select: "username email" },
        { path: "bike", select: "model brand registrationNumber" },
        { path: "servicePackage", select: "name price" },
        { path: "additionalServices", select: "name price" },
        { path: "sparePartsUsed.sparePart", select: "name price" },
      ],
    });

    if (!invoice) {
      return res.status(404).json({
        success: false,
        message: "Invoice not found",
      });
    }

    res.status(200).json({
      success: true,
      data: invoice,
    });
  } catch (error) {
    console.error("Error fetching invoice:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const createInvoice = async (req, res) => {
  try {
    const { serviceBooking, items, totalAmount, paymentMethod, transactionId } =
      req.body;

    // Validate total amount
    if (totalAmount < 0) {
      return res.status(400).json({
        success: false,
        message: "Total amount cannot be negative",
      });
    }

    // Check if service booking exists
    const booking = await serviceBookingModel.findById(serviceBooking);
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Service booking not found",
      });
    }

    // Check if invoice for this booking already exists
    const existingInvoice = await invoiceModel.findOne({ serviceBooking });
    if (existingInvoice) {
      return res.status(400).json({
        success: false,
        message: "Invoice for this service booking already exists",
      });
    }

    const invoice = await invoiceModel.create({
      serviceBooking,
      items,
      totalAmount,
      paymentStatus: "pending",
      paymentMethod,
      transactionId,
    });

    const populatedInvoice = await invoice.populate({
      path: "serviceBooking",
      populate: [
        { path: "user", select: "username email" },
        { path: "bike", select: "model brand registrationNumber" },
      ],
    });

    res.status(201).json({
      success: true,
      message: "Invoice created successfully",
      data: populatedInvoice,
    });
  } catch (error) {
    console.error("Error creating invoice:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateInvoice = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };

    // Validate total amount if provided
    if (updateData.totalAmount !== undefined && updateData.totalAmount < 0) {
      return res.status(400).json({
        success: false,
        message: "Total amount cannot be negative",
      });
    }

    // Prevent updating serviceBooking reference
    delete updateData.serviceBooking;

    const invoice = await invoiceModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .populate({
        path: "serviceBooking",
        populate: [
          { path: "user", select: "username email" },
          { path: "bike", select: "model brand registrationNumber" },
        ],
      });

    if (!invoice) {
      return res.status(404).json({
        success: false,
        message: "Invoice not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Invoice updated successfully",
      data: invoice,
    });
  } catch (error) {
    console.error("Error updating invoice:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteInvoice = async (req, res) => {
  try {
    const { id } = req.params;

    const invoice = await invoiceModel.findById(id);
    if (!invoice) {
      return res.status(404).json({
        success: false,
        message: "Invoice not found",
      });
    }

    // Prevent deletion of paid invoices
    if (invoice.paymentStatus === "paid") {
      return res.status(400).json({
        success: false,
        message: "Cannot delete paid invoice",
      });
    }

    await invoiceModel.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Invoice deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting invoice:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Additional useful endpoints

export const updatePaymentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { paymentStatus, paymentMethod, transactionId } = req.body;

    if (!["pending", "paid"].includes(paymentStatus)) {
      return res.status(400).json({
        success: false,
        message: "Invalid payment status",
      });
    }

    const invoice = await invoiceModel
      .findByIdAndUpdate(
        id,
        {
          paymentStatus,
          paymentMethod,
          transactionId,
          ...(paymentStatus === "paid" ? { paidAt: new Date() } : {}),
        },
        { new: true }
      )
      .populate({
        path: "serviceBooking",
        populate: [
          { path: "user", select: "username email" },
          { path: "bike", select: "model brand registrationNumber" },
        ],
      });

    if (!invoice) {
      return res.status(404).json({
        success: false,
        message: "Invoice not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Payment status updated successfully",
      data: invoice,
    });
  } catch (error) {
    console.error("Error updating payment status:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getInvoicesByDateRange = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    const query = {
      createdAt: {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      },
    };

    const invoices = await invoiceModel
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
      data: invoices,
    });
  } catch (error) {
    console.error("Error fetching invoices by date range:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getInvoicesByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const invoices = await invoiceModel
      .find()
      .populate({
        path: "serviceBooking",
        match: { user: userId },
        populate: [
          { path: "user", select: "username email" },
          { path: "bike", select: "model brand registrationNumber" },
        ],
      })
      .sort({ createdAt: -1 });

    // Filter out null serviceBookings (those that didn't match the user)
    const userInvoices = invoices.filter((invoice) => invoice.serviceBooking);

    res.status(200).json({
      success: true,
      data: userInvoices,
    });
  } catch (error) {
    console.error("Error fetching user's invoices:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
