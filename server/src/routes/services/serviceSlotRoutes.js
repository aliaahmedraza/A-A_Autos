import express from "express";
import {
  getServiceSlots,
  getServiceSlotById,
  createServiceSlot,
  updateServiceSlot,
  deleteServiceSlot,
  getAvailableSlots,
  updateBookedSlots,
} from "../../controllers/services/serviceSlotController.js";

const serviceSlotRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Service Slots
 *   description: API for managing service time slots
 */

/**
 * @swagger
 * /service-slot:
 *   get:
 *     summary: Retrieve a list of service slots
 *     description: Get all service slots with optional date and availability filters
 *     tags: [Service Slots]
 *     parameters:
 *       - in: query
 *         name: date
 *         schema:
 *           type: string
 *           format: date
 *         description: Filter slots by specific date (YYYY-MM-DD)
 *       - in: query
 *         name: available
 *         schema:
 *           type: boolean
 *         description: Filter only available slots (true/false)
 *     responses:
 *       200:
 *         description: Successfully retrieved service slots
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
 *                       date:
 *                         type: string
 *                         format: date-time
 *                         example: 2025-02-05T09:00:00.000Z
 *                       startTime:
 *                         type: string
 *                         example: "09:00"
 *                       endTime:
 *                         type: string
 *                         example: "10:00"
 *                       maxSlots:
 *                         type: number
 *                         example: 3
 *                       bookedSlots:
 *                         type: number
 *                         example: 1
 *       500:
 *         description: Internal Server Error
 */
serviceSlotRouter.get("/service-slot", getServiceSlots);

/**
 * @swagger
 * /service-slot/{id}:
 *   get:
 *     summary: Retrieve a single service slot by ID
 *     description: Get detailed information about a specific service slot
 *     tags: [Service Slots]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Service Slot ID
 *     responses:
 *       200:
 *         description: Successfully retrieved the service slot
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
 *                       example: 60d0fe4f5311236168a109ca
 *                     date:
 *                       type: string
 *                       format: date-time
 *                       example: 2025-02-05T09:00:00.000Z
 *                     startTime:
 *                       type: string
 *                       example: "09:00"
 *                     endTime:
 *                       type: string
 *                       example: "10:00"
 *                     maxSlots:
 *                       type: number
 *                       example: 3
 *                     bookedSlots:
 *                       type: number
 *                       example: 1
 *       404:
 *         description: Service slot not found
 *       500:
 *         description: Internal Server Error
 */
serviceSlotRouter.get("/service-slot/:id", getServiceSlotById);

/**
 * @swagger
 * /service-slot:
 *   post:
 *     summary: Create a new service slot
 *     description: Create a new service time slot with specified date and capacity
 *     tags: [Service Slots]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - date
 *               - startTime
 *               - endTime
 *               - maxSlots
 *             properties:
 *               date:
 *                 type: string
 *                 format: date
 *                 example: "2025-02-05"
 *               startTime:
 *                 type: string
 *                 example: "09:00"
 *               endTime:
 *                 type: string
 *                 example: "10:00"
 *               maxSlots:
 *                 type: number
 *                 example: 3
 *     responses:
 *       201:
 *         description: Service slot created successfully
 *       400:
 *         description: Invalid input data
 *       500:
 *         description: Internal Server Error
 */
serviceSlotRouter.post("/service-slot", createServiceSlot);

/**
 * @swagger
 * /service-slot/{id}:
 *   put:
 *     summary: Update a service slot
 *     description: Update details of an existing service slot
 *     tags: [Service Slots]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Service Slot ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               date:
 *                 type: string
 *                 format: date
 *                 example: "2025-02-05"
 *               startTime:
 *                 type: string
 *                 example: "09:00"
 *               endTime:
 *                 type: string
 *                 example: "10:00"
 *               maxSlots:
 *                 type: number
 *                 example: 3
 *     responses:
 *       200:
 *         description: Service slot updated successfully
 *       400:
 *         description: Invalid input data
 *       404:
 *         description: Service slot not found
 *       500:
 *         description: Internal Server Error
 */
serviceSlotRouter.put("/service-slot/:id", updateServiceSlot);

/**
 * @swagger
 * /service-slot/{id}:
 *   delete:
 *     summary: Delete a service slot
 *     description: Remove a service slot from the system
 *     tags: [Service Slots]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Service Slot ID
 *     responses:
 *       200:
 *         description: Service slot deleted successfully
 *       404:
 *         description: Service slot not found
 *       500:
 *         description: Internal Server Error
 */
serviceSlotRouter.delete("/service-slot/:id", deleteServiceSlot);

/**
 * @swagger
 * /service-slot/availability/range:
 *   get:
 *     summary: Get available service slots
 *     description: Retrieve all available service slots within a date range
 *     tags: [Service Slots]
 *     responses:
 *       200:
 *         description: Successfully retrieved available slots
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
 *                       date:
 *                         type: string
 *                         format: date-time
 *                       startTime:
 *                         type: string
 *                       endTime:
 *                         type: string
 *                       maxSlots:
 *                         type: number
 *                       bookedSlots:
 *                         type: number
 *       500:
 *         description: Internal Server Error
 */
serviceSlotRouter.get("/service-slot/availability/range", getAvailableSlots);

/**
 * @swagger
 * /service-slot/{id}/booking:
 *   patch:
 *     summary: Update booked slots
 *     description: Update the number of booked slots for a service slot
 *     tags: [Service Slots]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Service Slot ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - action
 *             properties:
 *               action:
 *                 type: string
 *                 enum: [increment, decrement]
 *                 example: increment
 *     responses:
 *       200:
 *         description: Booked slots updated successfully
 *       400:
 *         description: Invalid action or slot is full/empty
 *       404:
 *         description: Service slot not found
 *       500:
 *         description: Internal Server Error
 */
serviceSlotRouter.patch("/service-slot/:id/booking", updateBookedSlots);

export default serviceSlotRouter;
