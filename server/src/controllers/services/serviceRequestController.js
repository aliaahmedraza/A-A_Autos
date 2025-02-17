import serviceRequestModel from '../../model/serviceRequest/index.js';
import serviceBookingModel from '../../model/serviceBooking/index.js';
import mongoose from 'mongoose';

export const getServiceRequests = async (req, res) => {
    try {
        const { status } = req.query;
        
        // Build query based on filters
        let query = {};
        if (status) {
            query.status = status;
        }

        const serviceRequests = await serviceRequestModel.find(query)
            .populate('user', 'username email')
            .populate({
                path: 'serviceBooking',
                populate: [
                    { path: 'bike', select: 'model brand registrationNumber' }
                ]
            })
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            data: serviceRequests
        });
    } catch (error) {
        console.error("Error fetching service requests:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const getServiceRequestById = async (req, res) => {
    try {
        const { id } = req.params;
        const serviceRequest = await serviceRequestModel.findById(id)
            .populate('user', 'username email')
            .populate({
                path: 'serviceBooking',
                populate: [
                    { path: 'bike', select: 'model brand registrationNumber' },
                    { path: 'servicePackage', select: 'name' },
                    { path: 'additionalServices', select: 'name' }
                ]
            });

        if (!serviceRequest) {
            return res.status(404).json({
                success: false,
                message: 'Service request not found'
            });
        }

        res.status(200).json({
            success: true,
            data: serviceRequest
        });
    } catch (error) {
        console.error("Error fetching service request:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const createServiceRequest = async (req, res) => {
    try {
        const { user, serviceBooking, description } = req.body;

        // Validate serviceBooking is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(serviceBooking)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid serviceBooking ID format. Must be a valid MongoDB ObjectId.'
            });
        }

        // Check if service booking exists
        const booking = await serviceBookingModel.findById(serviceBooking);
        if (!booking) {
            return res.status(404).json({
                success: false,
                message: 'Service booking not found'
            });
        }

        // Verify if the user making the request matches the booking's user
        if (booking.user.toString() !== user) {
            return res.status(403).json({
                success: false,
                message: 'User is not authorized to create request for this booking'
            });
        }

        const serviceRequest = await serviceRequestModel.create({
            user,
            serviceBooking,
            description,
            status: 'open'
        });

        const populatedRequest = await serviceRequest
            .populate('user', 'username email')
            .populate({
                path: 'serviceBooking',
                populate: [
                    { path: 'bike', select: 'model brand registrationNumber' }
                ]
            });

        res.status(201).json({
            success: true,
            message: 'Service request created successfully',
            data: populatedRequest
        });
    } catch (error) {
        console.error("Error creating service request:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const updateServiceRequest = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = { ...req.body };

        // Prevent updating user and serviceBooking references
        delete updateData.user;
        delete updateData.serviceBooking;

        // Validate status if provided
        if (updateData.status && !['open', 'in_progress', 'resolved'].includes(updateData.status)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid status value'
            });
        }

        const serviceRequest = await serviceRequestModel.findByIdAndUpdate(
            id,
            updateData,
            { new: true }
        )
            .populate('user', 'username email')
            .populate({
                path: 'serviceBooking',
                populate: [
                    { path: 'bike', select: 'model brand registrationNumber' }
                ]
            });

        if (!serviceRequest) {
            return res.status(404).json({
                success: false,
                message: 'Service request not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Service request updated successfully',
            data: serviceRequest
        });
    } catch (error) {
        console.error("Error updating service request:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const deleteServiceRequest = async (req, res) => {
    try {
        const { id } = req.params;

        const serviceRequest = await serviceRequestModel.findById(id);
        if (!serviceRequest) {
            return res.status(404).json({
                success: false,
                message: 'Service request not found'
            });
        }

        // Only allow deletion of open requests
        if (serviceRequest.status !== 'open') {
            return res.status(400).json({
                success: false,
                message: 'Cannot delete request that is in progress or resolved'
            });
        }

        await serviceRequestModel.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: 'Service request deleted successfully'
        });
    } catch (error) {
        console.error("Error deleting service request:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Additional useful endpoints

export const updateRequestStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status, resolutionDetails } = req.body;

        if (!['open', 'in_progress', 'resolved'].includes(status)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid status value'
            });
        }

        // If marking as resolved, require resolution details
        if (status === 'resolved' && !resolutionDetails) {
            return res.status(400).json({
                success: false,
                message: 'Resolution details are required when marking request as resolved'
            });
        }

        const serviceRequest = await serviceRequestModel.findByIdAndUpdate(
            id,
            { 
                status,
                ...(resolutionDetails && { resolutionDetails })
            },
            { new: true }
        )
            .populate('user', 'username email')
            .populate({
                path: 'serviceBooking',
                populate: [
                    { path: 'bike', select: 'model brand registrationNumber' }
                ]
            });

        if (!serviceRequest) {
            return res.status(404).json({
                success: false,
                message: 'Service request not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Request status updated successfully',
            data: serviceRequest
        });
    } catch (error) {
        console.error("Error updating request status:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const getServiceRequestsByUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const { status } = req.query;

        let query = { user: userId };
        if (status) {
            query.status = status;
        }

        const serviceRequests = await serviceRequestModel.find(query)
            .populate('user', 'username email')
            .populate({
                path: 'serviceBooking',
                populate: [
                    { path: 'bike', select: 'model brand registrationNumber' }
                ]
            })
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            data: serviceRequests
        });
    } catch (error) {
        console.error("Error fetching user's service requests:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const getServiceRequestsByDateRange = async (req, res) => {
    try {
        const { startDate, endDate, status } = req.query;
        
        let query = {
            createdAt: {
                $gte: new Date(startDate),
                $lte: new Date(endDate)
            }
        };

        if (status) {
            query.status = status;
        }

        const serviceRequests = await serviceRequestModel.find(query)
            .populate('user', 'username email')
            .populate({
                path: 'serviceBooking',
                populate: [
                    { path: 'bike', select: 'model brand registrationNumber' }
                ]
            })
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            data: serviceRequests
        });
    } catch (error) {
        console.error("Error fetching service requests by date range:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
