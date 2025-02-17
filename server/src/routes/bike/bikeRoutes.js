import express from "express";
import {
  getBikes,
  getBikeById,
  createBike,
  updateBike,
  deleteBike,
  getBikesByUser,
} from "../../controllers/bike/bikeController.js";

const bikeRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Bikes
 *   description: API for managing bikes and their registration details
 */

/**
 * @swagger
 * /bike:
 *   get:
 *     summary: Retrieve all bikes
 *     description: Get a list of all registered bikes with their owner details
 *     tags: [Bikes]
 *     responses:
 *       200:
 *         description: Successfully retrieved bikes
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
 *                       _id:
 *                         type: string
 *                         example: 60d0fe4f5311236168a109ca
 *                       user:
 *                         type: object
 *                         properties:
 *                           username:
 *                             type: string
 *                           email:
 *                             type: string
 *                       model:
 *                         type: string
 *                         description: Bike model name
 *                       brand:
 *                         type: string
 *                         description: Bike manufacturer/brand
 *                       VIN:
 *                         type: string
 *                         description: Vehicle Identification Number
 *                       registrationNumber:
 *                         type: string
 *                         description: Official registration/license plate number
 *                       manufactureYear:
 *                         type: number
 *                         description: Year the bike was manufactured
 *                       color:
 *                         type: string
 *                         description: Color of the bike
 *                       currentMeterReading:
 *                         type: number
 *                         description: Current odometer reading in kilometers
 *                       purchaseDate:
 *                         type: string
 *                         format: date-time
 *                         description: Date when the bike was purchased
 *                       lastServiceDate:
 *                         type: string
 *                         format: date-time
 *                         description: Date of the last service
 *       500:
 *         description: Internal Server Error
 */
bikeRouter.get("/bike", getBikes);

/**
 * @swagger
 * /bike/{id}:
 *   get:
 *     summary: Get a specific bike
 *     description: Retrieve detailed information about a specific bike by its ID
 *     tags: [Bikes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Bike ID
 *     responses:
 *       200:
 *         description: Successfully retrieved the bike
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
 *                     _id:
 *                       type: string
 *                     user:
 *                       type: object
 *                       properties:
 *                         username:
 *                           type: string
 *                         email:
 *                           type: string
 *                     model:
 *                       type: string
 *                     brand:
 *                       type: string
 *                     VIN:
 *                       type: string
 *                     registrationNumber:
 *                       type: string
 *                     manufactureYear:
 *                       type: number
 *                     color:
 *                       type: string
 *                     currentMeterReading:
 *                       type: number
 *                     purchaseDate:
 *                       type: string
 *                       format: date-time
 *                     lastServiceDate:
 *                       type: string
 *                       format: date-time
 *       404:
 *         description: Bike not found
 *       500:
 *         description: Internal Server Error
 */
bikeRouter.get("/bike/:id", getBikeById);

/**
 * @swagger
 * /bike:
 *   post:
 *     summary: Register a new bike
 *     description: Add a new bike to the system with owner and registration details
 *     tags: [Bikes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user
 *               - model
 *               - brand
 *               - VIN
 *               - registrationNumber
 *             properties:
 *               user:
 *                 type: string
 *                 description: ID of the bike owner
 *               model:
 *                 type: string
 *                 description: Bike model name
 *               brand:
 *                 type: string
 *                 description: Bike manufacturer/brand
 *               VIN:
 *                 type: string
 *                 description: Vehicle Identification Number (unique)
 *               registrationNumber:
 *                 type: string
 *                 description: Official registration/license plate number (unique)
 *               manufactureYear:
 *                 type: number
 *                 description: Year the bike was manufactured
 *               color:
 *                 type: string
 *                 description: Color of the bike
 *               currentMeterReading:
 *                 type: number
 *                 description: Current odometer reading in kilometers
 *               purchaseDate:
 *                 type: string
 *                 format: date
 *                 description: Date when the bike was purchased (YYYY-MM-DD)
 *               lastServiceDate:
 *                 type: string
 *                 format: date
 *                 description: Date of the last service (YYYY-MM-DD)
 *     responses:
 *       201:
 *         description: Bike registered successfully
 *       400:
 *         description: Invalid input data or duplicate VIN/registration number
 *       500:
 *         description: Internal Server Error
 */
bikeRouter.post("/bike", createBike);

/**
 * @swagger
 * /bike/{id}:
 *   put:
 *     summary: Update a bike
 *     description: Update details of an existing bike
 *     tags: [Bikes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Bike ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               model:
 *                 type: string
 *               brand:
 *                 type: string
 *               VIN:
 *                 type: string
 *               registrationNumber:
 *                 type: string
 *               manufactureYear:
 *                 type: number
 *               color:
 *                 type: string
 *               currentMeterReading:
 *                 type: number
 *               purchaseDate:
 *                 type: string
 *                 format: date
 *               lastServiceDate:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Bike updated successfully
 *       400:
 *         description: Invalid input data or duplicate VIN/registration number
 *       404:
 *         description: Bike not found
 *       500:
 *         description: Internal Server Error
 */
bikeRouter.put("/bike/:id", updateBike);

/**
 * @swagger
 * /bike/{id}:
 *   delete:
 *     summary: Delete a bike
 *     description: Remove a bike from the system
 *     tags: [Bikes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Bike ID
 *     responses:
 *       200:
 *         description: Bike deleted successfully
 *       404:
 *         description: Bike not found
 *       500:
 *         description: Internal Server Error
 */
bikeRouter.delete("/bike/:id", deleteBike);

/**
 * @swagger
 * /user/{userId}/bikes:
 *   get:
 *     summary: Get bikes by user
 *     description: Retrieve all bikes owned by a specific user
 *     tags: [Bikes]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID to get bikes for
 *     responses:
 *       200:
 *         description: Successfully retrieved user's bikes
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
 *                     $ref: '#/components/schemas/Bike'
 *       500:
 *         description: Internal Server Error
 */
bikeRouter.get("/user/:userId/bikes", getBikesByUser);

export default bikeRouter;
