import express from "express";
import {
  getSpareParts,
  getSparePartById,
  createSparePart,
  updateSparePart,
  deleteSparePart,
  updateStock,
  getSparePartsByCategory,
  getLowStockSpareParts,
} from "../controllers/sparePartController.js";
import AuthenticationMiddleware from "../middlewares/authenticationmiddleware.js";

const sparePartRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: SpareParts
 *   description: API for managing spare parts and stock in A&A Autos
 */

/**
 * @swagger
 * /spare-part:
 *   get:
 *     summary: Retrieve a list of spare parts
 *     description: Get all spare parts with filter options for category and stock availability.
 *     tags: [SpareParts]
 *     parameters:
 *       - name: category
 *         in: query
 *         description: Filter spare parts by category
 *         required: false
 *         schema:
 *           type: string
 *       - name: inStock
 *         in: query
 *         description: Filter spare parts by stock availability (true or false)
 *         required: false
 *         schema:
 *           type: string
 *           enum: [true, false]
 *     responses:
 *       200:
 *         description: Successfully retrieved spare parts.
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
 *                       name:
 *                         type: string
 *                         example: Brake Pad
 *                       category:
 *                         type: string
 *                         example: Brakes
 *                       price:
 *                         type: number
 *                         example: 150.75
 *                       inStock:
 *                         type: boolean
 *                         example: true
 */
sparePartRouter.get("/spare-part", getSpareParts);

/**
 * @swagger
 * /spare-part/{id}:
 *   get:
 *     summary: Retrieve a single spare part by ID
 *     description: Fetch details of a spare part, excluding sensitive data.
 *     tags: [SpareParts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Spare part ID to retrieve
 *     responses:
 *       200:
 *         description: Successfully retrieved the spare part.
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
 *                     name:
 *                       type: string
 *                       example: Brake Pad
 *                     category:
 *                       type: string
 *                       example: Brakes
 *                     price:
 *                       type: number
 *                       example: 150.75
 *                     inStock:
 *                       type: boolean
 *                       example: true
 *       404:
 *         description: Spare part not found.
 */
sparePartRouter.get("/spare-part/:id", getSparePartById);

/**
 * @swagger
 * components:
 *   schemas:
 *     SparePart:
 *       type: object
 *       required:
 *         - name
 *         - description
 *         - price
 *         - quantity
 *         - category
 *       properties:
 *         name:
 *           type: string
 *           description: Name of the spare part
 *         description:
 *           type: string
 *           description: Description of the spare part
 *         price:
 *           type: number
 *           description: Price of the spare part
 *         quantity:
 *           type: number
 *           description: Available quantity of the spare part
 *         category:
 *           type: string
 *           description: Category of the spare part
 */

/**
 * @swagger
 * /spare-part:
 *   post:
 *     summary: Create a new spare part
 *     description: Create a new spare part with the provided details. Requires authentication.
 *     tags: [Spare Parts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SparePart'
 *     responses:
 *       201:
 *         description: Spare part created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Spare part created successfully"
 *                 data:
 *                   $ref: '#/components/schemas/SparePart'
 *       401:
 *         description: Authentication error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Authorization token missing or invalid format. Please provide a Bearer token."
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User not found or no longer exists"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "An error occurred while creating the spare part"
 */
sparePartRouter.post("/spare-part", AuthenticationMiddleware, createSparePart);

/**
 * @swagger
 * /spare-part/{id}:
 *   put:
 *     summary: Update spare part information
 *     description: Update details like name, category, price, and stock for a spare part.
 *     tags: [SpareParts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Spare part ID to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Updated Brake Pad
 *               category:
 *                 type: string
 *                 example: Brakes
 *               price:
 *                 type: number
 *                 example: 160.50
 *               inStock:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Spare part updated successfully.
 *       400:
 *         description: Invalid data or missing required fields.
 *       404:
 *         description: Spare part not found.
 */
sparePartRouter.put("/spare-part/:id", updateSparePart);

/**
 * @swagger
 * /spare-part/{id}:
 *   delete:
 *     summary: Delete a spare part
 *     description: Removes a spare part from the inventory.
 *     tags: [SpareParts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Spare part ID to delete
 *     responses:
 *       200:
 *         description: Spare part deleted successfully.
 *       404:
 *         description: Spare part not found.
 */
sparePartRouter.delete("/spare-part/:id", deleteSparePart);

/**
 * @swagger
 * /spare-part/{id}/stock:
 *   patch:
 *     summary: Update spare part stock
 *     description: Add or subtract stock for a given spare part.
 *     tags: [SpareParts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Spare part ID to update stock
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               quantity:
 *                 type: integer
 *                 example: 10
 *               operation:
 *                 type: string
 *                 enum: [add, subtract]
 *                 description: Operation to perform on stock
 *     responses:
 *       200:
 *         description: Stock updated successfully.
 *       400:
 *         description: Invalid operation or insufficient stock.
 *       404:
 *         description: Spare part not found.
 */
sparePartRouter.patch("/spare-part/:id/stock", updateStock);

/**
 * @swagger
 * /sparepart/category/{category}:
 *   get:
 *     summary: Retrieve spare parts by category
 *     description: Get all spare parts within a specific category.
 *     tags: [SpareParts]
 *     parameters:
 *       - in: path
 *         name: category
 *         required: true
 *         schema:
 *           type: string
 *         description: Category of spare parts
 *     responses:
 *       200:
 *         description: Successfully retrieved spare parts of the specified category.
 *       404:
 *         description: Category not found.
 */
sparePartRouter.get("/sparepart/category/:category", getSparePartsByCategory);

/**
 * @swagger
 * /spare-part/inventory/low-stock:
 *   get:
 *     summary: Retrieve spare parts with low stock
 *     description: Get spare parts that are running low on stock.
 *     tags: [SpareParts]
 *     parameters:
 *       - name: threshold
 *         in: query
 *         description: Minimum stock level to consider low (default is 10)
 *         required: false
 *         schema:
 *           type: integer
 *           default: 10
 *     responses:
 *       200:
 *         description: Successfully retrieved low stock spare parts.
 *       500:
 *         description: Internal server error.
 */
sparePartRouter.get("/spare-part/inventory/low-stock", getLowStockSpareParts);

export default sparePartRouter;
