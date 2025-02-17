import express from "express";
import {
  getServiceBookings,
  getServiceBookingById,
  createServiceBooking,
  updateServiceBooking,
  deleteServiceBooking,
  getServiceBookingsByUser,
  getServiceBookingsByStatus,
  updateServiceBookingStatus,
} from "../../controllers/services/serviceBookingController.js";

const serviceBookingRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Service Bookings
 *   description: API for managing service bookings and appointments
 */

/**
 * @swagger
 * /booking:
 *   get:
 *     summary: Retrieve a list of service bookings
 *     description: Get all service bookings with user, bike, and service details
 *     tags: [Service Bookings]
 *     responses:
 *       200:
 *         description: Successfully retrieved service bookings
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
 *                       bike:
 *                         type: object
 *                         properties:
 *                           model:
 *                             type: string
 *                           brand:
 *                             type: string
 *                           registrationNumber:
 *                             type: string
 *                       servicePackage:
 *                         type: object
 *                         properties:
 *                           name:
 *                             type: string
 *                           description:
 *                             type: string
 *                           price:
 *                             type: number
 *                       additionalServices:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             name:
 *                               type: string
 *                             price:
 *                               type: number
 *                       sparePartsUsed:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             sparePart:
 *                               type: object
 *                               properties:
 *                                 name:
 *                                   type: string
 *                                 partNumber:
 *                                   type: string
 *                                 price:
 *                                   type: number
 *                             quantity:
 *                               type: number
 *                       serviceSlot:
 *                         type: object
 *                         properties:
 *                           date:
 *                             type: string
 *                             format: date-time
 *                           startTime:
 *                             type: string
 *                           endTime:
 *                             type: string
 *                       pickupType:
 *                         type: string
 *                         enum: [self, pickup]
 *                       deliveryAddress:
 *                         type: string
 *                       deliveryDistance:
 *                         type: number
 *                       deliveryCharges:
 *                         type: number
 *                       totalCost:
 *                         type: number
 *                       status:
 *                         type: string
 *                         enum: [pending, confirmed, in-progress, completed, cancelled]
 *       500:
 *         description: Internal Server Error
 */
serviceBookingRouter.get("/booking", getServiceBookings);

/**
 * @swagger
 * /booking/{id}:
 *   get:
 *     summary: Retrieve a single service booking by ID
 *     description: Get detailed information about a specific service booking
 *     tags: [Service Bookings]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Service Booking ID
 *     responses:
 *       200:
 *         description: Successfully retrieved the service booking
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
 *                     bike:
 *                       type: object
 *                       properties:
 *                         model:
 *                           type: string
 *                         brand:
 *                           type: string
 *                         registrationNumber:
 *                           type: string
 *                     servicePackage:
 *                       type: object
 *                       properties:
 *                         name:
 *                           type: string
 *                         description:
 *                           type: string
 *                         price:
 *                           type: number
 *                     additionalServices:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           name:
 *                             type: string
 *                           price:
 *                             type: number
 *                     sparePartsUsed:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           sparePart:
 *                             type: object
 *                             properties:
 *                               name:
 *                                 type: string
 *                               partNumber:
 *                                 type: string
 *                               price:
 *                                 type: number
 *                           quantity:
 *                             type: number
 *                     serviceSlot:
 *                       type: object
 *                       properties:
 *                         date:
 *                           type: string
 *                           format: date-time
 *                         startTime:
 *                           type: string
 *                         endTime:
 *                           type: string
 *                     pickupType:
 *                       type: string
 *                       enum: [self, pickup]
 *                     deliveryAddress:
 *                       type: string
 *                     deliveryDistance:
 *                       type: number
 *                     deliveryCharges:
 *                       type: number
 *                     totalCost:
 *                       type: number
 *                     status:
 *                       type: string
 *                       enum: [pending, confirmed, in-progress, completed, cancelled]
 *       404:
 *         description: Service booking not found
 *       500:
 *         description: Internal Server Error
 */
serviceBookingRouter.get("/booking/:id", getServiceBookingById);

/**
 * @swagger
 * /booking:
 *   post:
 *     summary: Create a new service booking
 *     description: Create a new service booking with all necessary details
 *     tags: [Service Bookings]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user
 *               - bike
 *               - servicePackage
 *               - pickupType
 *               - totalCost
 *               - serviceSlot
 *             properties:
 *               user:
 *                 type: string
 *                 description: User ID
 *               bike:
 *                 type: string
 *                 description: Bike ID
 *               servicePackage:
 *                 type: string
 *                 description: Service Package ID
 *               additionalServices:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Array of Additional Service IDs
 *               sparePartsUsed:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     sparePart:
 *                       type: string
 *                       description: Spare Part ID
 *                     quantity:
 *                       type: number
 *                       description: Quantity of spare part used
 *               pickupType:
 *                 type: string
 *                 enum: [self, pickup]
 *                 description: Whether customer will bring bike or needs pickup
 *               deliveryAddress:
 *                 type: string
 *                 description: Required if pickupType is 'pickup'
 *               deliveryDistance:
 *                 type: number
 *                 description: Distance in kilometers if pickup service
 *               deliveryCharges:
 *                 type: number
 *                 description: Charges for pickup/delivery service
 *               totalCost:
 *                 type: number
 *                 description: Total cost including all services and charges
 *               serviceSlot:
 *                 type: string
 *                 description: Service Slot ID for the booking
 *     responses:
 *       201:
 *         description: Service booking created successfully
 *       400:
 *         description: Invalid input data or service slot already booked
 *       500:
 *         description: Internal Server Error
 */
serviceBookingRouter.post("/booking", createServiceBooking);

/**
 * @swagger
 * /booking/{id}:
 *   put:
 *     summary: Update a service booking
 *     description: Update details of an existing service booking
 *     tags: [Service Bookings]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Service Booking ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               additionalServices:
 *                 type: array
 *                 items:
 *                   type: string
 *               sparePartsUsed:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     sparePart:
 *                       type: string
 *                     quantity:
 *                       type: number
 *               pickupType:
 *                 type: string
 *                 enum: [self, pickup]
 *               deliveryAddress:
 *                 type: string
 *               deliveryDistance:
 *                 type: number
 *               deliveryCharges:
 *                 type: number
 *               totalCost:
 *                 type: number
 *     responses:
 *       200:
 *         description: Service booking updated successfully
 *       400:
 *         description: Invalid input data
 *       404:
 *         description: Service booking not found
 *       500:
 *         description: Internal Server Error
 */
serviceBookingRouter.put("/booking/:id", updateServiceBooking);

/**
 * @swagger
 * /booking/{id}:
 *   delete:
 *     summary: Delete a service booking
 *     description: Remove a service booking from the system
 *     tags: [Service Bookings]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Service Booking ID
 *     responses:
 *       200:
 *         description: Service booking deleted successfully
 *       404:
 *         description: Service booking not found
 *       500:
 *         description: Internal Server Error
 */
serviceBookingRouter.delete("/booking/:id", deleteServiceBooking);

/**
 * @swagger
 * /user/{userId}/bookings:
 *   get:
 *     summary: Get service bookings by user
 *     description: Retrieve all service bookings for a specific user
 *     tags: [Service Bookings]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID to get bookings for
 *     responses:
 *       200:
 *         description: Successfully retrieved user's service bookings
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
 *                     $ref: '#/components/schemas/ServiceBooking'
 *       500:
 *         description: Internal Server Error
 */
serviceBookingRouter.get("/user/:userId/bookings", getServiceBookingsByUser);

/**
 * @swagger
 * /booking/status/{status}:
 *   get:
 *     summary: Get service bookings by status
 *     description: Retrieve all service bookings with a specific status
 *     tags: [Service Bookings]
 *     parameters:
 *       - in: path
 *         name: status
 *         required: true
 *         schema:
 *           type: string
 *           enum: [pending, confirmed, in-progress, completed, cancelled]
 *         description: Status to filter bookings by
 *     responses:
 *       200:
 *         description: Successfully retrieved service bookings by status
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
 *                     $ref: '#/components/schemas/ServiceBooking'
 *       500:
 *         description: Internal Server Error
 */
serviceBookingRouter.get("/booking/status/:status", getServiceBookingsByStatus);

/**
 * @swagger
 * /booking/{id}/status:
 *   patch:
 *     summary: Update service booking status
 *     description: Update the status of an existing service booking
 *     tags: [Service Bookings]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Service Booking ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [pending, confirmed, in-progress, completed, cancelled]
 *                 description: New status for the booking
 *     responses:
 *       200:
 *         description: Service booking status updated successfully
 *       400:
 *         description: Invalid status value
 *       404:
 *         description: Service booking not found
 *       500:
 *         description: Internal Server Error
 */
serviceBookingRouter.patch("/booking/:id/status", updateServiceBookingStatus);

export default serviceBookingRouter;
