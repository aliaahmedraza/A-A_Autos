import userModel from "../../model/user/index.js";
import bcrypt from "bcrypt";

export const getUsers = async (req, res) => {
  try {
    const users = await userModel.find({}, { password: 0 });
    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching users",
      error: error.message,
    });
  }
};

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userModel.findById(id, { password: 0 });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching user",
      error: error.message,
    });
  }
};

export const createUser = async (req, res) => {
  try {
    const { username, email, address, contactNumber, cnic, password, role } =
      req.body;

    const foundUser = await userModel.findOne({
      $or: [{ email }, { username }, { cnic }],
    });

    if (foundUser) {
      return res.status(400).json({
        message: "Your account has already been registered",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      username,
      email,
      address,
      contactNumber,
      cnic,
      password: hashedPassword,
      role,
    });

    res.status(201).json({
      message: "User created successfully",
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
      },
    });
  } catch (error) {
    console.error("Error inserting data into User model:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email, address, contactNumber, cnic, password } =
      req.body;

    // Check if user exists
    const user = await userModel.findById(id);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Check if email/username/cnic is already taken by another user
    if (email || username || cnic) {
      const existingUser = await userModel.findOne({
        _id: { $ne: id }, // exclude current user
        $or: [
          { email: email || user.email },
          { username: username || user.username },
          { cnic: cnic || user.cnic },
        ],
      });

      if (existingUser) {
        return res.status(400).json({
          message: "Email, username, or CNIC is already taken",
        });
      }
    }

    // Prepare update data
    const updateData = {
      username: username || user.username,
      email: email || user.email,
      address: address || user.address,
      contactNumber: contactNumber || user.contactNumber,
      cnic: cnic || user.cnic,
    };

    // If password is provided, hash it
    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    // Update user
    const updatedUser = await userModel.findByIdAndUpdate(
      id,
      updateData,
      { new: true, select: "-password" } // return updated doc and exclude password
    );

    res.status(200).json({
      message: "User updated successfully",
      user: {
        id: updatedUser._id,
        email: updatedUser.email,
        username: updatedUser.username,
      },
    });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if user exists
    const user = await userModel.findById(id);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Delete user
    await userModel.findByIdAndDelete(id);

    res.status(200).json({
      message: "User deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
