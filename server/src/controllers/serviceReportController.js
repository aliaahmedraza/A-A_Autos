import serviceReportModel from '../model/serviceReport/index.js';
import serviceBookingModel from '../model/serviceBooking/index.js';

export const getServiceReports = async (req, res) => {
    try {
        const serviceReports = await serviceReportModel.find()
            .populate({
                path: 'serviceBooking',
                populate: [
                    { path: 'user', select: 'username email' },
                    { path: 'bike', select: 'model brand registrationNumber' }
                ]
            })
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            data: serviceReports
        });
    } catch (error) {
        console.error("Error fetching service reports:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const getServiceReportById = async (req, res) => {
    try {
        const { id } = req.params;
        const serviceReport = await serviceReportModel.findById(id)
            .populate({
                path: 'serviceBooking',
                populate: [
                    { path: 'user', select: 'username email' },
                    { path: 'bike', select: 'model brand registrationNumber' },
                    { path: 'servicePackage', select: 'name' },
                    { path: 'additionalServices', select: 'name' },
                    { path: 'sparePartsUsed.sparePart', select: 'name' }
                ]
            });

        if (!serviceReport) {
            return res.status(404).json({
                success: false,
                message: 'Service report not found'
            });
        }

        res.status(200).json({
            success: true,
            data: serviceReport
        });
    } catch (error) {
        console.error("Error fetching service report:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const createServiceReport = async (req, res) => {
    try {
        const { serviceBooking, reportDetails, mediaUrls } = req.body;

        // Check if service booking exists
        const booking = await serviceBookingModel.findById(serviceBooking);
        if (!booking) {
            return res.status(404).json({
                success: false,
                message: 'Service booking not found'
            });
        }

        // Check if report for this booking already exists
        const existingReport = await serviceReportModel.findOne({ serviceBooking });
        if (existingReport) {
            return res.status(400).json({
                success: false,
                message: 'Service report for this booking already exists'
            });
        }

        // Validate media URLs if provided
        if (mediaUrls) {
            const validUrls = mediaUrls.every(url => {
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
                    message: 'Invalid media URL format'
                });
            }
        }

        const serviceReport = await serviceReportModel.create({
            serviceBooking,
            reportDetails,
            mediaUrls: mediaUrls || []
        });

        const populatedReport = await serviceReport.populate({
            path: 'serviceBooking',
            populate: [
                { path: 'user', select: 'username email' },
                { path: 'bike', select: 'model brand registrationNumber' }
            ]
        });

        res.status(201).json({
            success: true,
            message: 'Service report created successfully',
            data: populatedReport
        });
    } catch (error) {
        console.error("Error creating service report:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const updateServiceReport = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = { ...req.body };

        // Prevent updating serviceBooking reference
        delete updateData.serviceBooking;

        // Validate media URLs if provided
        if (updateData.mediaUrls) {
            const validUrls = updateData.mediaUrls.every(url => {
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
                    message: 'Invalid media URL format'
                });
            }
        }

        const serviceReport = await serviceReportModel.findByIdAndUpdate(
            id,
            updateData,
            { new: true }
        ).populate({
            path: 'serviceBooking',
            populate: [
                { path: 'user', select: 'username email' },
                { path: 'bike', select: 'model brand registrationNumber' }
            ]
        });

        if (!serviceReport) {
            return res.status(404).json({
                success: false,
                message: 'Service report not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Service report updated successfully',
            data: serviceReport
        });
    } catch (error) {
        console.error("Error updating service report:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const deleteServiceReport = async (req, res) => {
    try {
        const { id } = req.params;

        const serviceReport = await serviceReportModel.findById(id);
        if (!serviceReport) {
            return res.status(404).json({
                success: false,
                message: 'Service report not found'
            });
        }

        await serviceReportModel.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: 'Service report deleted successfully'
        });
    } catch (error) {
        console.error("Error deleting service report:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Additional useful endpoints

export const getServiceReportsByDateRange = async (req, res) => {
    try {
        const { startDate, endDate } = req.query;
        
        const query = {
            createdAt: {
                $gte: new Date(startDate),
                $lte: new Date(endDate)
            }
        };

        const serviceReports = await serviceReportModel.find(query)
            .populate({
                path: 'serviceBooking',
                populate: [
                    { path: 'user', select: 'username email' },
                    { path: 'bike', select: 'model brand registrationNumber' }
                ]
            })
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            data: serviceReports
        });
    } catch (error) {
        console.error("Error fetching service reports by date range:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const getServiceReportsByUser = async (req, res) => {
    try {
        const { userId } = req.params;
        
        const serviceReports = await serviceReportModel.find()
            .populate({
                path: 'serviceBooking',
                match: { user: userId },
                populate: [
                    { path: 'user', select: 'username email' },
                    { path: 'bike', select: 'model brand registrationNumber' }
                ]
            })
            .sort({ createdAt: -1 });

        // Filter out null serviceBookings (those that didn't match the user)
        const userReports = serviceReports.filter(report => report.serviceBooking);

        res.status(200).json({
            success: true,
            data: userReports
        });
    } catch (error) {
        console.error("Error fetching user's service reports:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const getServiceReportsByBike = async (req, res) => {
    try {
        const { bikeId } = req.params;
        
        const serviceReports = await serviceReportModel.find()
            .populate({
                path: 'serviceBooking',
                match: { bike: bikeId },
                populate: [
                    { path: 'user', select: 'username email' },
                    { path: 'bike', select: 'model brand registrationNumber' }
                ]
            })
            .sort({ createdAt: -1 });

        // Filter out null serviceBookings (those that didn't match the bike)
        const bikeReports = serviceReports.filter(report => report.serviceBooking);

        res.status(200).json({
            success: true,
            data: bikeReports
        });
    } catch (error) {
        console.error("Error fetching bike's service reports:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
