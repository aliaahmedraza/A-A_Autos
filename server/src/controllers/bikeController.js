import bikeModel from '../model/bike/index.js';

export const getBikes = async (req, res) => {
    try {
        const bikes = await bikeModel.find().populate('user', 'username email');
        res.status(200).json({
            success: true,
            data: bikes
        });
    } catch (error) {
        console.error("Error fetching bikes:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const getBikeById = async (req, res) => {
    try {
        const { id } = req.params;
        const bike = await bikeModel.findById(id).populate('user', 'username email');
        
        if (!bike) {
            return res.status(404).json({
                success: false,
                message: 'Bike not found'
            });
        }

        res.status(200).json({
            success: true,
            data: bike
        });
    } catch (error) {
        console.error("Error fetching bike:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const createBike = async (req, res) => {
    try {
        const { 
            user, 
            model, 
            brand, 
            VIN, 
            registrationNumber, 
            manufactureYear, 
            color, 
            currentMeterReading,
            purchaseDate,
            lastServiceDate 
        } = req.body;

        // Check if VIN or registration number already exists
        const existingBike = await bikeModel.findOne({
            $or: [
                { VIN },
                { registrationNumber }
            ]
        });

        if (existingBike) {
            return res.status(400).json({
                success: false,
                message: 'Bike with this VIN or registration number already exists'
            });
        }

        const bike = await bikeModel.create({
            user,
            model,
            brand,
            VIN,
            registrationNumber,
            manufactureYear,
            color,
            currentMeterReading,
            purchaseDate: purchaseDate ? new Date(purchaseDate) : undefined,
            lastServiceDate: lastServiceDate ? new Date(lastServiceDate) : undefined
        });

        const populatedBike = await bike.populate('user', 'username email');

        res.status(201).json({
            success: true,
            message: 'Bike registered successfully',
            data: populatedBike
        });
    } catch (error) {
        console.error("Error creating bike:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const updateBike = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = { ...req.body };

        // Convert dates if provided
        if (updateData.purchaseDate) {
            updateData.purchaseDate = new Date(updateData.purchaseDate);
        }
        if (updateData.lastServiceDate) {
            updateData.lastServiceDate = new Date(updateData.lastServiceDate);
        }

        // Check if bike exists
        const existingBike = await bikeModel.findById(id);
        if (!existingBike) {
            return res.status(404).json({
                success: false,
                message: 'Bike not found'
            });
        }

        // Check if VIN or registration is being updated and if it's already taken
        if (updateData.VIN || updateData.registrationNumber) {
            const duplicateBike = await bikeModel.findOne({
                _id: { $ne: id },
                $or: [
                    { VIN: updateData.VIN || existingBike.VIN },
                    { registrationNumber: updateData.registrationNumber || existingBike.registrationNumber }
                ]
            });

            if (duplicateBike) {
                return res.status(400).json({
                    success: false,
                    message: 'VIN or registration number is already taken'
                });
            }
        }

        const updatedBike = await bikeModel.findByIdAndUpdate(
            id,
            updateData,
            { new: true }
        ).populate('user', 'username email');

        res.status(200).json({
            success: true,
            message: 'Bike updated successfully',
            data: updatedBike
        });
    } catch (error) {
        console.error("Error updating bike:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const deleteBike = async (req, res) => {
    try {
        const { id } = req.params;

        // Check if bike exists
        const bike = await bikeModel.findById(id);
        if (!bike) {
            return res.status(404).json({
                success: false,
                message: 'Bike not found'
            });
        }

        await bikeModel.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: 'Bike deleted successfully'
        });
    } catch (error) {
        console.error("Error deleting bike:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Additional useful endpoints

export const getBikesByUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const bikes = await bikeModel.find({ user: userId }).populate('user', 'username email');
        
        res.status(200).json({
            success: true,
            data: bikes
        });
    } catch (error) {
        console.error("Error fetching user's bikes:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
