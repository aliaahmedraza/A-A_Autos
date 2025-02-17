import serviceSlotModel from '../../model/serviceSlot/index.js';

export const getServiceSlots = async (req, res) => {
    try {
        const { date, available } = req.query;
        
        // Build query based on filters
        let query = {};
        if (date) {
            const startOfDay = new Date(date);
            startOfDay.setHours(0, 0, 0, 0);
            
            const endOfDay = new Date(date);
            endOfDay.setHours(23, 59, 59, 999);
            
            query.date = {
                $gte: startOfDay,
                $lte: endOfDay
            };
        }

        // If available flag is set, only show slots with available capacity
        if (available === 'true') {
            query.$expr = { $lt: ["$bookedSlots", "$maxSlots"] };
        }

        const serviceSlots = await serviceSlotModel.find(query)
            .sort({ date: 1, startTime: 1 });

        res.status(200).json({
            success: true,
            data: serviceSlots
        });
    } catch (error) {
        console.error("Error fetching service slots:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const getServiceSlotById = async (req, res) => {
    try {
        const { id } = req.params;
        const serviceSlot = await serviceSlotModel.findById(id);

        if (!serviceSlot) {
            return res.status(404).json({
                success: false,
                message: 'Service slot not found'
            });
        }

        res.status(200).json({
            success: true,
            data: serviceSlot
        });
    } catch (error) {
        console.error("Error fetching service slot:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const createServiceSlot = async (req, res) => {
    try {
        const { date, startTime, endTime, maxSlots } = req.body;

        // Validate time format (HH:mm)
        const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
        if (!timeRegex.test(startTime) || !timeRegex.test(endTime)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid time format. Use HH:mm format (e.g., 09:00)'
            });
        }

        // Validate start time is before end time
        const [startHour, startMinute] = startTime.split(':').map(Number);
        const [endHour, endMinute] = endTime.split(':').map(Number);
        if (startHour > endHour || (startHour === endHour && startMinute >= endMinute)) {
            return res.status(400).json({
                success: false,
                message: 'Start time must be before end time'
            });
        }

        // Validate maxSlots
        if (maxSlots !== undefined && maxSlots <= 0) {
            return res.status(400).json({
                success: false,
                message: 'Maximum slots must be greater than 0'
            });
        }

        // Check for overlapping slots on the same date
        const slotDate = new Date(date);
        slotDate.setHours(0, 0, 0, 0);
        
        const existingSlot = await serviceSlotModel.findOne({
            date: {
                $gte: slotDate,
                $lt: new Date(slotDate.getTime() + 24 * 60 * 60 * 1000)
            },
            $or: [
                {
                    startTime: { $lte: startTime },
                    endTime: { $gt: startTime }
                },
                {
                    startTime: { $lt: endTime },
                    endTime: { $gte: endTime }
                }
            ]
        });

        if (existingSlot) {
            return res.status(400).json({
                success: false,
                message: 'Time slot overlaps with an existing slot'
            });
        }

        const serviceSlot = await serviceSlotModel.create({
            date: slotDate,
            startTime,
            endTime,
            maxSlots: maxSlots || 5,
            bookedSlots: 0
        });

        res.status(201).json({
            success: true,
            message: 'Service slot created successfully',
            data: serviceSlot
        });
    } catch (error) {
        console.error("Error creating service slot:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const updateServiceSlot = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = { ...req.body };

        // Validate time format if provided
        const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
        if (updateData.startTime && !timeRegex.test(updateData.startTime)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid start time format. Use HH:mm format (e.g., 09:00)'
            });
        }
        if (updateData.endTime && !timeRegex.test(updateData.endTime)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid end time format. Use HH:mm format (e.g., 09:00)'
            });
        }

        // If both times are provided, validate start is before end
        if (updateData.startTime && updateData.endTime) {
            const [startHour, startMinute] = updateData.startTime.split(':').map(Number);
            const [endHour, endMinute] = updateData.endTime.split(':').map(Number);
            if (startHour > endHour || (startHour === endHour && startMinute >= endMinute)) {
                return res.status(400).json({
                    success: false,
                    message: 'Start time must be before end time'
                });
            }
        }

        // Validate maxSlots if provided
        if (updateData.maxSlots !== undefined) {
            if (updateData.maxSlots <= 0) {
                return res.status(400).json({
                    success: false,
                    message: 'Maximum slots must be greater than 0'
                });
            }

            const currentSlot = await serviceSlotModel.findById(id);
            if (currentSlot && updateData.maxSlots < currentSlot.bookedSlots) {
                return res.status(400).json({
                    success: false,
                    message: 'Cannot reduce maximum slots below current booked slots'
                });
            }
        }

        const serviceSlot = await serviceSlotModel.findByIdAndUpdate(
            id,
            updateData,
            { new: true }
        );

        if (!serviceSlot) {
            return res.status(404).json({
                success: false,
                message: 'Service slot not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Service slot updated successfully',
            data: serviceSlot
        });
    } catch (error) {
        console.error("Error updating service slot:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const deleteServiceSlot = async (req, res) => {
    try {
        const { id } = req.params;

        const serviceSlot = await serviceSlotModel.findById(id);
        if (!serviceSlot) {
            return res.status(404).json({
                success: false,
                message: 'Service slot not found'
            });
        }

        // Prevent deletion if slot has bookings
        if (serviceSlot.bookedSlots > 0) {
            return res.status(400).json({
                success: false,
                message: 'Cannot delete slot with existing bookings'
            });
        }

        await serviceSlotModel.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: 'Service slot deleted successfully'
        });
    } catch (error) {
        console.error("Error deleting service slot:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Additional useful endpoints

export const getAvailableSlots = async (req, res) => {
    try {
        const { startDate, endDate } = req.query;
        
        const query = {
            date: {
                $gte: new Date(startDate),
                $lte: new Date(endDate)
            },
            $expr: { $lt: ["$bookedSlots", "$maxSlots"] }
        };

        const availableSlots = await serviceSlotModel.find(query)
            .sort({ date: 1, startTime: 1 });

        res.status(200).json({
            success: true,
            data: availableSlots
        });
    } catch (error) {
        console.error("Error fetching available slots:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const updateBookedSlots = async (req, res) => {
    try {
        const { id } = req.params;
        const { action } = req.body; // 'increment' or 'decrement'

        if (!['increment', 'decrement'].includes(action)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid action. Use increment or decrement'
            });
        }

        const slot = await serviceSlotModel.findById(id);
        if (!slot) {
            return res.status(404).json({
                success: false,
                message: 'Service slot not found'
            });
        }

        if (action === 'increment' && slot.bookedSlots >= slot.maxSlots) {
            return res.status(400).json({
                success: false,
                message: 'Slot is already fully booked'
            });
        }

        if (action === 'decrement' && slot.bookedSlots <= 0) {
            return res.status(400).json({
                success: false,
                message: 'No bookings to remove'
            });
        }

        const update = {
            $inc: { bookedSlots: action === 'increment' ? 1 : -1 }
        };

        const updatedSlot = await serviceSlotModel.findByIdAndUpdate(
            id,
            update,
            { new: true }
        );

        res.status(200).json({
            success: true,
            message: 'Booked slots updated successfully',
            data: updatedSlot
        });
    } catch (error) {
        console.error("Error updating booked slots:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
