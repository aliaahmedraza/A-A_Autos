import additionalServiceModel from '../../model/additionalService/index.js';

export const getAdditionalServices = async (req, res) => {
    try {
        const services = await additionalServiceModel.find()
            .sort({ name: 1 });

        res.status(200).json({
            success: true,
            data: services
        });
    } catch (error) {
        console.error("Error fetching additional services:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const getAdditionalServiceById = async (req, res) => {
    try {
        const { id } = req.params;
        const service = await additionalServiceModel.findById(id);

        if (!service) {
            return res.status(404).json({
                success: false,
                message: 'Additional service not found'
            });
        }

        res.status(200).json({
            success: true,
            data: service
        });
    } catch (error) {
        console.error("Error fetching additional service:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const createAdditionalService = async (req, res) => {
    try {
        const { name, description, price } = req.body;

        // Validate price
        if (price < 0) {
            return res.status(400).json({
                success: false,
                message: 'Price cannot be negative'
            });
        }

        // Check if service with same name exists
        const existingService = await additionalServiceModel.findOne({ 
            name: { $regex: new RegExp(`^${name}$`, 'i') } 
        });

        if (existingService) {
            return res.status(400).json({
                success: false,
                message: 'Service with this name already exists'
            });
        }

        const service = await additionalServiceModel.create({
            name,
            description,
            price
        });

        res.status(201).json({
            success: true,
            message: 'Additional service created successfully',
            data: service
        });
    } catch (error) {
        console.error("Error creating additional service:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const updateAdditionalService = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = { ...req.body };

        // Validate price if provided
        if (updateData.price !== undefined && updateData.price < 0) {
            return res.status(400).json({
                success: false,
                message: 'Price cannot be negative'
            });
        }

        // Check if new name conflicts with existing service
        if (updateData.name) {
            const existingService = await additionalServiceModel.findOne({
                _id: { $ne: id },
                name: { $regex: new RegExp(`^${updateData.name}$`, 'i') }
            });

            if (existingService) {
                return res.status(400).json({
                    success: false,
                    message: 'Service with this name already exists'
                });
            }
        }

        const service = await additionalServiceModel.findByIdAndUpdate(
            id,
            updateData,
            { new: true }
        );

        if (!service) {
            return res.status(404).json({
                success: false,
                message: 'Additional service not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Additional service updated successfully',
            data: service
        });
    } catch (error) {
        console.error("Error updating additional service:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const deleteAdditionalService = async (req, res) => {
    try {
        const { id } = req.params;

        // Check if service exists
        const service = await additionalServiceModel.findById(id);
        if (!service) {
            return res.status(404).json({
                success: false,
                message: 'Additional service not found'
            });
        }

        // Check if service is being used in any service bookings
        // Note: You might want to add this check if needed
        const bookingsWithService = await serviceBookingModel.findOne({ additionalServices: id });
        if (bookingsWithService) {
            return res.status(400).json({
                success: false,
                message: 'Cannot delete service as it is associated with existing bookings'
            });
        }

        await additionalServiceModel.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: 'Additional service deleted successfully'
        });
    } catch (error) {
        console.error("Error deleting additional service:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Additional useful endpoints

export const searchAdditionalServices = async (req, res) => {
    try {
        const { query } = req.query;
        
        const services = await additionalServiceModel.find({
            $or: [
                { name: { $regex: query, $options: 'i' } },
                { description: { $regex: query, $options: 'i' } }
            ]
        }).sort({ name: 1 });

        res.status(200).json({
            success: true,
            data: services
        });
    } catch (error) {
        console.error("Error searching additional services:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const getServicesByPriceRange = async (req, res) => {
    try {
        const { minPrice, maxPrice } = req.query;
        
        const query = {};
        if (minPrice !== undefined) query.price = { $gte: Number(minPrice) };
        if (maxPrice !== undefined) {
            query.price = { ...query.price, $lte: Number(maxPrice) };
        }

        const services = await additionalServiceModel.find(query)
            .sort({ price: 1 });

        res.status(200).json({
            success: true,
            data: services
        });
    } catch (error) {
        console.error("Error fetching services by price range:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
