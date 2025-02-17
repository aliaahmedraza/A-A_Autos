import express from "express";
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "../../controllers/users/userController.js";
// import AuthenticationMiddleware from "../middlewares/authenticationmiddleware.js";

const userRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API for managing users
 */

/**
 * @swagger
 * /user:
 *   get:
 *     summary: Retrieve a list of users
 *     description: Get all users with sensitive data excluded.
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Successfully retrieved users.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: 60d0fe4f5311236168a109ca
 *                       username:
 *                         type: string
 *                         example: johndoe
 *                       email:
 *                         type: string
 *                         example: johndoe@example.com
 */
userRouter.get("/user", getUsers);

/**
 * @swagger
 * /user/{id}:
 *   get:
 *     summary: Retrieve a single user by ID
 *     description: Fetch user details except password.
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID to retrieve
 *     responses:
 *       200:
 *         description: Successfully retrieved the user.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: 60d0fe4f5311236168a109ca
 *                     username:
 *                       type: string
 *                       example: johndoe
 *                     email:
 *                       type: string
 *                       example: johndoe@example.com
 *       404:
 *         description: User not found.
 */
userRouter.get("/user/:id", getUserById);

/**
 * @swagger
 * /signup:
 *   post:
 *     summary: Create a new user
 *     description: Register a new user with the provided details
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - address
 *               - contactNumber
 *               - cnic
 *               - password
 *               - role
 *             properties:
 *               username:
 *                 type: string
 *                 example: "johndoe"
 *                 description: Unique username for the user
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "john@example.com"
 *                 description: Unique email address
 *               address:
 *                 type: string
 *                 example: "123 Main St, City"
 *                 description: User's physical address
 *               contactNumber:
 *                 type: string
 *                 example: "+92 300 1234567"
 *                 description: User's contact number
 *               cnic:
 *                 type: string
 *                 example: "12345-1234567-1"
 *                 description: Unique CNIC number
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "securePassword123"
 *                 description: User's password (will be hashed)
 *               role:
 *                 type: string
 *                 enum: [admin, user]
 *                 example: "user"
 *                 description: User's role in the system
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "User created successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "60d0fe4f5311236168a109ca"
 *                     username:
 *                       type: string
 *                       example: "johndoe"
 *                     email:
 *                       type: string
 *                       example: "john@example.com"
 *                     address:
 *                       type: string
 *                       example: "123 Main St, City"
 *                     contactNumber:
 *                       type: string
 *                       example: "+92 300 1234567"
 *                     cnic:
 *                       type: string
 *                       example: "12345-1234567-1"
 *                     role:
 *                       type: string
 *                       example: "user"
 *       400:
 *         description: Bad request - Validation error or duplicate user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Email, username, or CNIC already exists"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "An error occurred while creating the user"
 */
userRouter.post("/signup", createUser);

/**
 * @swagger
 * /user/{id}:
 *   put:
 *     summary: Update user information
 *     description: Update user details like username, email, and password.
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: johndoe_updated
 *               email:
 *                 type: string
 *                 example: johndoe_updated@example.com
 *               address:
 *                 type: string
 *                 example: 456 New Street, New City
 *               contactNumber:
 *                 type: string
 *                 example: "+1234567891"
 *               cnic:
 *                 type: string
 *                 example: "42101-1234567-8"
 *               password:
 *                 type: string
 *                 example: myNewSecurePassword
 *     responses:
 *       200:
 *         description: User updated successfully.
 *       400:
 *         description: Email, username, or CNIC already taken.
 *       404:
 *         description: User not found.
 */
userRouter.put("/user/:id", updateUser);

/**
 * @swagger
 * /user/{id}:
 *   delete:
 *     summary: Delete a user
 *     description: Removes a user from the database.
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID to delete
 *     responses:
 *       200:
 *         description: User deleted successfully.
 *       404:
 *         description: User not found.
 */
userRouter.delete("/user/:id", deleteUser);

export default userRouter;
