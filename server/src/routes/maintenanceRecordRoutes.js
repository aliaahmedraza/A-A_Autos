import express from "express";
import {
  getMaintenanceRecords,
  getMaintenanceRecordById,
  createMaintenanceRecord,
  updateMaintenanceRecord,
  deleteMaintenanceRecord,
  getMaintenanceRecordsByBike,
  getMaintenanceRecordsByDateRange,
} from "../controllers/maintenanceRecordController.js";

const maintenanceRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Maintenance Records
 *   description: API for managing bike maintenance records and service history
 */

/**
 * @swagger
 * /maintenance:
 *   get:
 *     summary: Retrieve all maintenance records
 *     description: Get a list of all maintenance records with bike and service details
 *     tags: [Maintenance Records]
 *     responses:
 *       200:
 *         description: Successfully retrieved maintenance records
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
 *                       bike:
 *                         type: object
 *                         properties:
 *                           model:
 *                             type: string
 *                           brand:
 *                             type: string
 *                           registrationNumber:
 *                             type: string
 *                       serviceBooking:
 *                         type: object
 *                         description: Reference to the service booking
 *                       serviceDate:
 *                         type: string
 *                         format: date-time
 *                       nextServiceDue:
 *                         type: string
 *                         format: date-time
 *                       mileageAtService:
 *                         type: number
 *                         description: Odometer reading at service
 *                       notes:
 *                         type: string
 *                         description: General service notes
 *                       mechanicNotes:
 *                         type: string
 *                         description: Technical notes from mechanic
 *                       replacedParts:
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
 *                             quantity:
 *                               type: number
 *       500:
 *         description: Internal Server Error
 */
maintenanceRouter.get("/maintenance", getMaintenanceRecords);

/**
 * @swagger
 * /maintenance/{id}:
 *   get:
 *     summary: Get a specific maintenance record
 *     description: Retrieve detailed information about a specific maintenance record by its ID
 *     tags: [Maintenance Records]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Maintenance Record ID
 *     responses:
 *       200:
 *         description: Successfully retrieved the maintenance record
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
 *                     bike:
 *                       type: object
 *                       properties:
 *                         model:
 *                           type: string
 *                         brand:
 *                           type: string
 *                         registrationNumber:
 *                           type: string
 *                     serviceBooking:
 *                       type: object
 *                     serviceDate:
 *                       type: string
 *                       format: date-time
 *                     nextServiceDue:
 *                       type: string
 *                       format: date-time
 *                     mileageAtService:
 *                       type: number
 *                     notes:
 *                       type: string
 *                     mechanicNotes:
 *                       type: string
 *                     replacedParts:
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
 *                           quantity:
 *                             type: number
 *       404:
 *         description: Maintenance record not found
 *       500:
 *         description: Internal Server Error
 */
maintenanceRouter.get("/maintenance/:id", getMaintenanceRecordById);

/**
 * @swagger
 * /maintenance:
 *   post:
 *     summary: Create a new maintenance record
 *     description: Create a new maintenance record with service details and replaced parts
 *     tags: [Maintenance Records]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - bike
 *               - serviceBooking
 *               - serviceDate
 *               - mileageAtService
 *             properties:
 *               bike:
 *                 type: string
 *                 description: ID of the bike serviced
 *               serviceBooking:
 *                 type: string
 *                 description: ID of the associated service booking
 *               serviceDate:
 *                 type: string
 *                 format: date-time
 *                 description: Date when service was performed
 *               nextServiceDue:
 *                 type: string
 *                 format: date-time
 *                 description: Date when next service is recommended
 *               mileageAtService:
 *                 type: number
 *                 description: Odometer reading at time of service
 *               notes:
 *                 type: string
 *                 description: General notes about the service
 *               mechanicNotes:
 *                 type: string
 *                 description: Technical notes from the mechanic
 *               replacedParts:
 *                 type: array
 *                 description: List of parts replaced during service
 *                 items:
 *                   type: object
 *                   properties:
 *                     sparePart:
 *                       type: string
 *                       description: ID of the spare part
 *                     quantity:
 *                       type: number
 *                       description: Number of parts used
 *     responses:
 *       201:
 *         description: Maintenance record created successfully
 *       400:
 *         description: Invalid input data
 *       500:
 *         description: Internal Server Error
 */
maintenanceRouter.post("/maintenance", createMaintenanceRecord);

/**
 * @swagger
 * /maintenance/{id}:
 *   put:
 *     summary: Update a maintenance record
 *     description: Update details of an existing maintenance record
 *     tags: [Maintenance Records]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Maintenance Record ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               serviceDate:
 *                 type: string
 *                 format: date-time
 *               nextServiceDue:
 *                 type: string
 *                 format: date-time
 *               mileageAtService:
 *                 type: number
 *               notes:
 *                 type: string
 *               mechanicNotes:
 *                 type: string
 *               replacedParts:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     sparePart:
 *                       type: string
 *                     quantity:
 *                       type: number
 *     responses:
 *       200:
 *         description: Maintenance record updated successfully
 *       404:
 *         description: Maintenance record not found
 *       500:
 *         description: Internal Server Error
 */
maintenanceRouter.put("/maintenance/:id", updateMaintenanceRecord);

/**
 * @swagger
 * /maintenance/{id}:
 *   delete:
 *     summary: Delete a maintenance record
 *     description: Remove a maintenance record from the system
 *     tags: [Maintenance Records]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Maintenance Record ID
 *     responses:
 *       200:
 *         description: Maintenance record deleted successfully
 *       404:
 *         description: Maintenance record not found
 *       500:
 *         description: Internal Server Error
 */
maintenanceRouter.delete("/maintenance/:id", deleteMaintenanceRecord);

/**
 * @swagger
 * /bike/{bikeId}/maintenance:
 *   get:
 *     summary: Get maintenance records for a specific bike
 *     description: Retrieve all maintenance records associated with a particular bike
 *     tags: [Maintenance Records]
 *     parameters:
 *       - in: path
 *         name: bikeId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the bike to get maintenance records for
 *     responses:
 *       200:
 *         description: Successfully retrieved bike's maintenance records
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
 *                     $ref: '#/components/schemas/MaintenanceRecord'
 *       500:
 *         description: Internal Server Error
 */
maintenanceRouter.get("/bike/:bikeId/maintenance", getMaintenanceRecordsByBike);

/**
 * @swagger
 * /maintenance/search/date:
 *   get:
 *     summary: Search maintenance records by date range
 *     description: Retrieve maintenance records within a specified date range
 *     tags: [Maintenance Records]
 *     parameters:
 *       - in: query
 *         name: startDate
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *         description: Start date for the search range (YYYY-MM-DD)
 *       - in: query
 *         name: endDate
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *         description: End date for the search range (YYYY-MM-DD)
 *     responses:
 *       200:
 *         description: Successfully retrieved maintenance records in date range
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
 *                     $ref: '#/components/schemas/MaintenanceRecord'
 *       400:
 *         description: Invalid date format or range
 *       500:
 *         description: Internal Server Error
 */
maintenanceRouter.get(
  "/maintenance/search/date",
  getMaintenanceRecordsByDateRange
);

export default maintenanceRouter;
