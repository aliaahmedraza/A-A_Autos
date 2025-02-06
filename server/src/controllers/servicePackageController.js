import servicePackageModel from '../model/servicePackage/index.js';
import serviceBookingModel from '../model/serviceBooking/index.js';

export const getServicePackages = async (req, res) => {
    try {
        const servicePackages = await servicePackageModel.find()
            .sort({ name: 1 });

        res.status(200).json({
            success: true,
            data: servicePackages
        });
    } catch (error) {
        console.error("Error fetching service packages:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const getServicePackageById = async (req, res) => {
    try {
        const { id } = req.params;
        const servicePackage = await servicePackageModel.findById(id);

        if (!servicePackage) {
            return res.status(404).json({
                success: false,
                message: 'Service package not found'
            });
        }

        res.status(200).json({
            success: true,
            data: servicePackage
        });
    } catch (error) {
        console.error("Error fetching service package:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const createServicePackage = async (req, res) => {
    try {
        const { name, description, price } = req.body;

        // Validate price
        if (price < 0) {
            return res.status(400).json({
                success: false,
                message: 'Price cannot be negative'
            });
        }

        // Check if package with same name exists
        const existingPackage = await servicePackageModel.findOne({ 
            name: { $regex: new RegExp(`^${name}$`, 'i') } 
        });

        if (existingPackage) {
            return res.status(400).json({
                success: false,
                message: 'Service package with this name already exists'
            });
        }

        const servicePackage = await servicePackageModel.create({
            name,
            description,
            price
        });

        res.status(201).json({
            success: true,
            message: 'Service package created successfully',
            data: servicePackage
        });
    } catch (error) {
        console.error("Error creating service package:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const updateServicePackage = async (req, res) => {
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

        // Check if new name conflicts with existing package
        if (updateData.name) {
            const existingPackage = await servicePackageModel.findOne({
                _id: { $ne: id },
                name: { $regex: new RegExp(`^${updateData.name}$`, 'i') }
            });

            if (existingPackage) {
                return res.status(400).json({
                    success: false,
                    message: 'Service package with this name already exists'
                });
            }
        }

        const servicePackage = await servicePackageModel.findByIdAndUpdate(
            id,
            updateData,
            { new: true }
        );

        if (!servicePackage) {
            return res.status(404).json({
                success: false,
                message: 'Service package not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Service package updated successfully',
            data: servicePackage
        });
    } catch (error) {
        console.error("Error updating service package:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const deleteServicePackage = async (req, res) => {
    try {
        const { id } = req.params;

        // Check if package exists
        const servicePackage = await servicePackageModel.findById(id);
        if (!servicePackage) {
            return res.status(404).json({
                success: false,
                message: 'Service package not found'
            });
        }

        // Check if package is being used in any service bookings
        const bookingsWithPackage = await serviceBookingModel.findOne({ servicePackage: id });
        if (bookingsWithPackage) {
            return res.status(400).json({
                success: false,
                message: 'Cannot delete service package as it is associated with existing bookings'
            });
        }

        await servicePackageModel.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: 'Service package deleted successfully'
        });
    } catch (error) {
        console.error("Error deleting service package:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Additional useful endpoints

export const searchServicePackages = async (req, res) => {
    try {
        const { query } = req.query;
        
        const servicePackages = await servicePackageModel.find({
            $or: [
                { name: { $regex: query, $options: 'i' } },
                { description: { $regex: query, $options: 'i' } }
            ]
        }).sort({ name: 1 });

        res.status(200).json({
            success: true,
            data: servicePackages
        });
    } catch (error) {
        console.error("Error searching service packages:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const getServicePackagesByPriceRange = async (req, res) => {
    try {
        const { minPrice, maxPrice } = req.query;
        
        const query = {};
        if (minPrice !== undefined) query.price = { $gte: Number(minPrice) };
        if (maxPrice !== undefined) {
            query.price = { ...query.price, $lte: Number(maxPrice) };
        }

        const servicePackages = await servicePackageModel.find(query)
            .sort({ price: 1 });

        res.status(200).json({
            success: true,
            data: servicePackages
        });
    } catch (error) {
        console.error("Error fetching service packages by price range:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
