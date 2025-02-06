import serviceBookingModel from '../model/serviceBooking/index.js';
import mongoose from 'mongoose';

export const getServiceBookings = async (req, res) => {
    try {
        const bookings = await serviceBookingModel.find()
            .populate('user', 'username email')
            .populate('bike', 'model brand registrationNumber')
            .populate('servicePackage', 'name description price')
            .populate('additionalServices', 'name price')
            .populate('sparePartsUsed.sparePart', 'name partNumber price')
            .populate('serviceSlot', 'date startTime endTime');

        res.status(200).json({
            success: true,
            data: bookings
        });
    } catch (error) {
        console.error("Error fetching service bookings:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const getServiceBookingById = async (req, res) => {
    try {
        const { id } = req.params;
        const booking = await serviceBookingModel.findById(id)
            .populate('user', 'username email')
            .populate('bike', 'model brand registrationNumber')
            .populate('servicePackage', 'name description price')
            .populate('additionalServices', 'name price')
            .populate('sparePartsUsed.sparePart', 'name partNumber price')
            .populate('serviceSlot', 'date startTime endTime');

        if (!booking) {
            return res.status(404).json({
                success: false,
                message: 'Service booking not found'
            });
        }

        res.status(200).json({
            success: true,
            data: booking
        });
    } catch (error) {
        console.error("Error fetching service booking:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const createServiceBooking = async (req, res) => {
    try {
        const {
            user,
            bike,
            servicePackage,
            additionalServices,
            sparePartsUsed,
            pickupType,
            deliveryAddress,
            deliveryDistance,
            deliveryCharges,
            totalCost,
            serviceSlot
        } = req.body;

        // Validate ObjectId fields
        const requiredObjectIds = {
            user,
            bike,
            servicePackage,
            serviceSlot
        };

        for (const [field, value] of Object.entries(requiredObjectIds)) {
            if (!mongoose.Types.ObjectId.isValid(value)) {
                return res.status(400).json({
                    success: false,
                    message: `Invalid ${field} ID format. Must be a valid MongoDB ObjectId.`
                });
            }
        }

        // Validate additionalServices array if provided
        if (additionalServices && additionalServices.length > 0) {
            for (const serviceId of additionalServices) {
                if (!mongoose.Types.ObjectId.isValid(serviceId)) {
                    return res.status(400).json({
                        success: false,
                        message: `Invalid additionalService ID format in array. Each ID must be a valid MongoDB ObjectId.`
                    });
                }
            }
        }

        // Validate sparePartsUsed array if provided
        if (sparePartsUsed && sparePartsUsed.length > 0) {
            for (const part of sparePartsUsed) {
                if (!mongoose.Types.ObjectId.isValid(part.sparePart)) {
                    return res.status(400).json({
                        success: false,
                        message: `Invalid sparePart ID format in sparePartsUsed array. Each sparePart ID must be a valid MongoDB ObjectId.`
                    });
                }
            }
        }

        // Check if service slot is available
        const existingBooking = await serviceBookingModel.findOne({
            serviceSlot,
            status: { $nin: ['cancelled', 'completed'] }
        });

        if (existingBooking) {
            return res.status(400).json({
                success: false,
                message: 'This service slot is already booked'
            });
        }

        const booking = await serviceBookingModel.create({
            user,
            bike,
            servicePackage,
            additionalServices: additionalServices || [],
            sparePartsUsed: sparePartsUsed || [],
            pickupType,
            deliveryAddress,
            deliveryDistance,
            deliveryCharges,
            totalCost,
            serviceSlot,
            status: 'pending'
        });

        const populatedBooking = await booking.populate([
            { path: 'user', select: 'username email' },
            { path: 'bike', select: 'model brand registrationNumber' },
            { path: 'servicePackage', select: 'name description price' },
            { path: 'additionalServices', select: 'name price' },
            { path: 'sparePartsUsed.sparePart', select: 'name partNumber price' },
            { path: 'serviceSlot', select: 'date startTime endTime' }
        ]);

        res.status(201).json({
            success: true,
            message: 'Service booking created successfully',
            data: populatedBooking
        });
    } catch (error) {
        console.error("Error creating service booking:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const updateServiceBooking = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = { ...req.body };

        // Check if booking exists
        const existingBooking = await serviceBookingModel.findById(id);
        if (!existingBooking) {
            return res.status(404).json({
                success: false,
                message: 'Service booking not found'
            });
        }

        // If updating service slot, check if new slot is available
        if (updateData.serviceSlot && updateData.serviceSlot !== existingBooking.serviceSlot.toString()) {
            const slotBooked = await serviceBookingModel.findOne({
                serviceSlot: updateData.serviceSlot,
                status: { $nin: ['cancelled', 'completed'] },
                _id: { $ne: id }
            });

            if (slotBooked) {
                return res.status(400).json({
                    success: false,
                    message: 'This service slot is already booked'
                });
            }
        }

        const updatedBooking = await serviceBookingModel.findByIdAndUpdate(
            id,
            updateData,
            { new: true }
        ).populate([
            { path: 'user', select: 'username email' },
            { path: 'bike', select: 'model brand registrationNumber' },
            { path: 'servicePackage', select: 'name description price' },
            { path: 'additionalServices', select: 'name price' },
            { path: 'sparePartsUsed.sparePart', select: 'name partNumber price' },
            { path: 'serviceSlot', select: 'date startTime endTime' }
        ]);

        res.status(200).json({
            success: true,
            message: 'Service booking updated successfully',
            data: updatedBooking
        });
    } catch (error) {
        console.error("Error updating service booking:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const deleteServiceBooking = async (req, res) => {
    try {
        const { id } = req.params;

        // Check if booking exists
        const booking = await serviceBookingModel.findById(id);
        if (!booking) {
            return res.status(404).json({
                success: false,
                message: 'Service booking not found'
            });
        }

        await serviceBookingModel.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: 'Service booking deleted successfully'
        });
    } catch (error) {
        console.error("Error deleting service booking:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Additional useful endpoints

export const getServiceBookingsByUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const bookings = await serviceBookingModel.find({ user: userId })
            .populate('user', 'username email')
            .populate('bike', 'model brand registrationNumber')
            .populate('servicePackage', 'name description price')
            .populate('additionalServices', 'name price')
            .populate('sparePartsUsed.sparePart', 'name partNumber price')
            .populate('serviceSlot', 'date startTime endTime')
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            data: bookings
        });
    } catch (error) {
        console.error("Error fetching user's service bookings:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const getServiceBookingsByStatus = async (req, res) => {
    try {
        const { status } = req.params;
        const bookings = await serviceBookingModel.find({ status })
            .populate('user', 'username email')
            .populate('bike', 'model brand registrationNumber')
            .populate('servicePackage', 'name description price')
            .populate('additionalServices', 'name price')
            .populate('sparePartsUsed.sparePart', 'name partNumber price')
            .populate('serviceSlot', 'date startTime endTime')
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            data: bookings
        });
    } catch (error) {
        console.error("Error fetching service bookings by status:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const updateServiceBookingStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!['pending', 'approved', 'in_progress', 'completed', 'cancelled'].includes(status)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid status value'
            });
        }

        const booking = await serviceBookingModel.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        ).populate([
            { path: 'user', select: 'username email' },
            { path: 'bike', select: 'model brand registrationNumber' },
            { path: 'servicePackage', select: 'name description price' },
            { path: 'additionalServices', select: 'name price' },
            { path: 'sparePartsUsed.sparePart', select: 'name partNumber price' },
            { path: 'serviceSlot', select: 'date startTime endTime' }
        ]);

        if (!booking) {
            return res.status(404).json({
                success: false,
                message: 'Service booking not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Service booking status updated successfully',
            data: booking
        });
    } catch (error) {
        console.error("Error updating service booking status:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
