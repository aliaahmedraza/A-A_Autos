import maintenanceRecordModel from '../model/maintenanceRecord/index.js';

export const getMaintenanceRecords = async (req, res) => {
    try {
        const records = await maintenanceRecordModel.find()
            .populate('bike', 'model brand registrationNumber')
            .populate('serviceBooking')
            .populate('replacedParts.sparePart', 'name partNumber');

        res.status(200).json({
            success: true,
            data: records
        });
    } catch (error) {
        console.error("Error fetching maintenance records:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const getMaintenanceRecordById = async (req, res) => {
    try {
        const { id } = req.params;
        const record = await maintenanceRecordModel.findById(id)
            .populate('bike', 'model brand registrationNumber')
            .populate('serviceBooking')
            .populate('replacedParts.sparePart', 'name partNumber');

        if (!record) {
            return res.status(404).json({
                success: false,
                message: 'Maintenance record not found'
            });
        }

        res.status(200).json({
            success: true,
            data: record
        });
    } catch (error) {
        console.error("Error fetching maintenance record:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const createMaintenanceRecord = async (req, res) => {
    try {
        const {
            bike,
            serviceBooking,
            serviceDate,
            nextServiceDue,
            mileageAtService,
            notes,
            mechanicNotes,
            replacedParts
        } = req.body;

        const record = await maintenanceRecordModel.create({
            bike,
            serviceBooking,
            serviceDate: new Date(serviceDate),
            nextServiceDue: nextServiceDue ? new Date(nextServiceDue) : undefined,
            mileageAtService,
            notes,
            mechanicNotes,
            replacedParts: replacedParts || []
        });

        const populatedRecord = await record.populate([
            { path: 'bike', select: 'model brand registrationNumber' },
            { path: 'serviceBooking' },
            { path: 'replacedParts.sparePart', select: 'name partNumber' }
        ]);

        res.status(201).json({
            success: true,
            message: 'Maintenance record created successfully',
            data: populatedRecord
        });
    } catch (error) {
        console.error("Error creating maintenance record:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const updateMaintenanceRecord = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = { ...req.body };

        // Convert dates if provided
        if (updateData.serviceDate) {
            updateData.serviceDate = new Date(updateData.serviceDate);
        }
        if (updateData.nextServiceDue) {
            updateData.nextServiceDue = new Date(updateData.nextServiceDue);
        }

        // Check if record exists
        const existingRecord = await maintenanceRecordModel.findById(id);
        if (!existingRecord) {
            return res.status(404).json({
                success: false,
                message: 'Maintenance record not found'
            });
        }

        const updatedRecord = await maintenanceRecordModel.findByIdAndUpdate(
            id,
            updateData,
            { new: true }
        ).populate([
            { path: 'bike', select: 'model brand registrationNumber' },
            { path: 'serviceBooking' },
            { path: 'replacedParts.sparePart', select: 'name partNumber' }
        ]);

        res.status(200).json({
            success: true,
            message: 'Maintenance record updated successfully',
            data: updatedRecord
        });
    } catch (error) {
        console.error("Error updating maintenance record:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const deleteMaintenanceRecord = async (req, res) => {
    try {
        const { id } = req.params;

        // Check if record exists
        const record = await maintenanceRecordModel.findById(id);
        if (!record) {
            return res.status(404).json({
                success: false,
                message: 'Maintenance record not found'
            });
        }

        await maintenanceRecordModel.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: 'Maintenance record deleted successfully'
        });
    } catch (error) {
        console.error("Error deleting maintenance record:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Additional useful endpoints

export const getMaintenanceRecordsByBike = async (req, res) => {
    try {
        const { bikeId } = req.params;
        const records = await maintenanceRecordModel.find({ bike: bikeId })
            .populate('bike', 'model brand registrationNumber')
            .populate('serviceBooking')
            .populate('replacedParts.sparePart', 'name partNumber')
            .sort({ serviceDate: -1 }); // Most recent first

        res.status(200).json({
            success: true,
            data: records
        });
    } catch (error) {
        console.error("Error fetching bike's maintenance records:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const getMaintenanceRecordsByDateRange = async (req, res) => {
    try {
        const { startDate, endDate } = req.query;
        
        const query = {
            serviceDate: {
                $gte: new Date(startDate),
                $lte: new Date(endDate)
            }
        };

        const records = await maintenanceRecordModel.find(query)
            .populate('bike', 'model brand registrationNumber')
            .populate('serviceBooking')
            .populate('replacedParts.sparePart', 'name partNumber')
            .sort({ serviceDate: -1 });

        res.status(200).json({
            success: true,
            data: records
        });
    } catch (error) {
        console.error("Error fetching maintenance records by date range:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
