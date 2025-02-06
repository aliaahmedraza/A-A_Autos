import express from "express";
import {
  getServiceRequests,
  getServiceRequestById,
  createServiceRequest,
  updateServiceRequest,
  deleteServiceRequest,
  updateRequestStatus,
  getServiceRequestsByUser,
  getServiceRequestsByDateRange,
} from "../controllers/serviceRequestController.js";

const serviceRequestRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Service Requests
 *   description: API for managing service requests and support tickets
 */

/**
 * @swagger
 * /service-request:
 *   get:
 *     summary: Retrieve a list of service requests
 *     description: Get all service requests with optional status filter. Includes user and bike details.
 *     tags: [Service Requests]
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [open, in-progress, resolved, closed]
 *         description: Filter requests by status
 *     responses:
 *       200:
 *         description: Successfully retrieved service requests
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
 *                           _id:
 *                             type: string
 *                           username:
 *                             type: string
 *                           email:
 *                             type: string
 *                       serviceBooking:
 *                         type: object
 *                         properties:
 *                           bike:
 *                             type: object
 *                             properties:
 *                               model:
 *                                 type: string
 *                               brand:
 *                                 type: string
 *                               registrationNumber:
 *                                 type: string
 *                       description:
 *                         type: string
 *                       status:
 *                         type: string
 *                         enum: [open, in-progress, resolved, closed]
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *       500:
 *         description: Internal Server Error
 */
serviceRequestRouter.get("/service-request", getServiceRequests);

/**
 * @swagger
 * /service-request/{id}:
 *   get:
 *     summary: Retrieve a single service request by ID
 *     description: Get detailed information about a specific service request including user, bike, and service details
 *     tags: [Service Requests]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Service Request ID
 *     responses:
 *       200:
 *         description: Successfully retrieved the service request
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
 *                     serviceBooking:
 *                       type: object
 *                       properties:
 *                         bike:
 *                           type: object
 *                           properties:
 *                             model:
 *                               type: string
 *                             brand:
 *                               type: string
 *                             registrationNumber:
 *                               type: string
 *                         servicePackage:
 *                           type: object
 *                           properties:
 *                             name:
 *                               type: string
 *                         additionalServices:
 *                           type: array
 *                           items:
 *                             type: object
 *                             properties:
 *                               name:
 *                                 type: string
 *                     description:
 *                       type: string
 *                     status:
 *                       type: string
 *                       enum: [open, in-progress, resolved, closed]
 *       404:
 *         description: Service request not found
 *       500:
 *         description: Internal Server Error
 */
serviceRequestRouter.get("/service-request/:id", getServiceRequestById);

/**
 * @swagger
 * /service-request:
 *   post:
 *     summary: Create a new service request
 *     description: Create a new service request for an existing service booking. The serviceBooking must be a valid MongoDB ObjectId obtained from an existing service booking.
 *     tags: [Service Requests]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user
 *               - serviceBooking
 *               - description
 *             properties:
 *               user:
 *                 type: string
 *                 format: objectId
 *                 description: MongoDB ObjectId of the user creating the request
 *                 example: "507f1f77bcf86cd799439011"
 *               serviceBooking:
 *                 type: string
 *                 format: objectId
 *                 description: MongoDB ObjectId of an existing service booking. Must be obtained by first creating a service booking.
 *                 example: "507f1f77bcf86cd799439012"
 *               description:
 *                 type: string
 *                 description: Detailed description of the service request
 *                 example: "Need to check unusual noise from the engine"
 *             example:
 *               user: "507f1f77bcf86cd799439011"
 *               serviceBooking: "507f1f77bcf86cd799439012"
 *               description: "Need to check unusual noise from the engine"
 *     responses:
 *       201:
 *         description: Service request created successfully
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
 *                   example: "Service request created successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "507f1f77bcf86cd799439013"
 *                     user:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                           example: "507f1f77bcf86cd799439011"
 *                         username:
 *                           type: string
 *                           example: "john_doe"
 *                         email:
 *                           type: string
 *                           example: "john@example.com"
 *                     serviceBooking:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                           example: "507f1f77bcf86cd799439012"
 *                         bike:
 *                           type: object
 *                           properties:
 *                             model:
 *                               type: string
 *                               example: "CBR 600RR"
 *                             brand:
 *                               type: string
 *                               example: "Honda"
 *                             registrationNumber:
 *                               type: string
 *                               example: "ABC-123"
 *                     description:
 *                       type: string
 *                       example: "Need to check unusual noise from the engine"
 *                     status:
 *                       type: string
 *                       example: "open"
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-02-05T10:30:00.000Z"
 *       400:
 *         description: Invalid input data
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
 *                   example: "Invalid serviceBooking ID format"
 *       403:
 *         description: User not authorized to create request for this booking
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
 *                   example: "User is not authorized to create request for this booking"
 *       404:
 *         description: Service booking not found
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
 *                   example: "Service booking not found"
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal Server Error"
 */
serviceRequestRouter.post("/service-request", createServiceRequest);

/**
 * @swagger
 * /service-request/{id}:
 *   put:
 *     summary: Update a service request
 *     description: Update details of an existing service request
 *     tags: [Service Requests]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Service Request ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               description:
 *                 type: string
 *                 description: Updated description of the service request
 *     responses:
 *       200:
 *         description: Service request updated successfully
 *       404:
 *         description: Service request not found
 *       500:
 *         description: Internal Server Error
 */
serviceRequestRouter.put("/service-request/:id", updateServiceRequest);

/**
 * @swagger
 * /service-request/{id}:
 *   delete:
 *     summary: Delete a service request
 *     description: Remove a service request from the system
 *     tags: [Service Requests]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Service Request ID
 *     responses:
 *       200:
 *         description: Service request deleted successfully
 *       404:
 *         description: Service request not found
 *       500:
 *         description: Internal Server Error
 */
serviceRequestRouter.delete("/service-request/:id", deleteServiceRequest);

/**
 * @swagger
 * /service-request/{id}/status:
 *   patch:
 *     summary: Update service request status
 *     description: Update the status of an existing service request
 *     tags: [Service Requests]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Service Request ID
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
 *                 enum: [open, in-progress, resolved, closed]
 *                 description: New status for the service request
 *     responses:
 *       200:
 *         description: Service request status updated successfully
 *       400:
 *         description: Invalid status value
 *       404:
 *         description: Service request not found
 *       500:
 *         description: Internal Server Error
 */
serviceRequestRouter.patch("/service-request/:id/status", updateRequestStatus);

/**
 * @swagger
 * /user/{userId}/service-requests:
 *   get:
 *     summary: Get service requests by user
 *     description: Retrieve all service requests for a specific user
 *     tags: [Service Requests]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID to get requests for
 *     responses:
 *       200:
 *         description: Successfully retrieved user's service requests
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
 *                       description:
 *                         type: string
 *                       status:
 *                         type: string
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *       500:
 *         description: Internal Server Error
 */
serviceRequestRouter.get(
  "/user/:userId/service-requests",
  getServiceRequestsByUser
);

/**
 * @swagger
 * /service-request/search/date:
 *   get:
 *     summary: Get service requests by date range
 *     description: Retrieve service requests within a specified date range
 *     tags: [Service Requests]
 *     parameters:
 *       - in: query
 *         name: startDate
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *         description: Start date (YYYY-MM-DD)
 *       - in: query
 *         name: endDate
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *         description: End date (YYYY-MM-DD)
 *     responses:
 *       200:
 *         description: Successfully retrieved service requests within date range
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
 *                       description:
 *                         type: string
 *                       status:
 *                         type: string
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *       400:
 *         description: Invalid date format or range
 *       500:
 *         description: Internal Server Error
 */
serviceRequestRouter.get(
  "/service-request/search/date",
  getServiceRequestsByDateRange
);

export default serviceRequestRouter;
