import express from "express";
import {
  getServiceUpdates,
  getServiceUpdateById,
  createServiceUpdate,
  updateServiceUpdate,
  deleteServiceUpdate,
  updateApprovalStatus,
  getServiceUpdatesByBooking,
  getPendingApprovals,
} from "../../controllers/services/serviceUpdateController.js";

const serviceUpdateRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: ServiceUpdates
 *   description: API for managing service updates and approvals for A&A Autos
 */

/**
 * @swagger
 * /service-update:
 *   get:
 *     summary: Retrieve a list of service updates
 *     description: Get all service updates with filter options for approval status and user approval.
 *     tags: [ServiceUpdates]
 *     parameters:
 *       - name: requiresApproval
 *         in: query
 *         description: Filter service updates by whether they require approval (true or false).
 *         required: false
 *         schema:
 *           type: string
 *           enum: [true, false]
 *       - name: userApproved
 *         in: query
 *         description: Filter service updates by user approval status (true or false).
 *         required: false
 *         schema:
 *           type: string
 *           enum: [true, false]
 *     responses:
 *       200:
 *         description: Successfully retrieved service updates.
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
 *                       serviceBooking:
 *                         type: object
 *                         properties:
 *                           user:
 *                             type: object
 *                             properties:
 *                               username:
 *                                 type: string
 *                                 example: john_doe
 *                               email:
 *                                 type: string
 *                                 example: john_doe@example.com
 *                           bike:
 *                             type: object
 *                             properties:
 *                               model:
 *                                 type: string
 *                                 example: Honda CBR 250R
 *                               brand:
 *                                 type: string
 *                                 example: Honda
 *                               registrationNumber:
 *                                 type: string
 *                                 example: AB123CD
 *                       description:
 *                         type: string
 *                         example: Brake system maintenance
 *                       mediaUrls:
 *                         type: array
 *                         items:
 *                           type: string
 *                           example: http://example.com/image.jpg
 *                       requiresApproval:
 *                         type: boolean
 *                         example: true
 *                       userApproved:
 *                         type: boolean
 *                         example: false
 */
serviceUpdateRouter.get("/service-update", getServiceUpdates);

/**
 * @swagger
 * /service-update/{id}:
 *   get:
 *     summary: Retrieve a single service update by ID
 *     description: Fetch the details of a specific service update by ID.
 *     tags: [ServiceUpdates]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Service update ID to retrieve
 *     responses:
 *       200:
 *         description: Successfully retrieved the service update.
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
 *                     serviceBooking:
 *                       type: object
 *                       properties:
 *                         user:
 *                           type: object
 *                           properties:
 *                             username:
 *                               type: string
 *                               example: john_doe
 *                             email:
 *                               type: string
 *                               example: john_doe@example.com
 *                         bike:
 *                           type: object
 *                           properties:
 *                             model:
 *                               type: string
 *                               example: Honda CBR 250R
 *                             brand:
 *                               type: string
 *                               example: Honda
 *                             registrationNumber:
 *                               type: string
 *                               example: AB123CD
 *                       description:
 *                         type: string
 *                         example: Brake system maintenance
 *                       mediaUrls:
 *                         type: array
 *                         items:
 *                           type: string
 *                           example: http://example.com/image.jpg
 *                       requiresApproval:
 *                         type: boolean
 *                         example: true
 *                       userApproved:
 *                         type: boolean
 *                         example: false
 *       404:
 *         description: Service update not found.
 */
serviceUpdateRouter.get("/service-update/:id", getServiceUpdateById);

/**
 * @swagger
 * /service-update:
 *   post:
 *     summary: Create a new service update
 *     description: Add a new service update with details such as description, media URLs, and approval status.
 *     tags: [ServiceUpdates]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               serviceBooking:
 *                 type: string
 *                 example: 60d0fe4f5311236168a109ca
 *               description:
 *                 type: string
 *                 example: Brake system maintenance
 *               mediaUrls:
 *                 type: array
 *                 items:
 *                   type: string
 *                   example: http://example.com/image.jpg
 *               requiresApproval:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       201:
 *         description: Service update created successfully.
 *       400:
 *         description: Missing required fields or invalid data.
 */
serviceUpdateRouter.post("/service-update", createServiceUpdate);

/**
 * @swagger
 * /service-update/{id}:
 *   put:
 *     summary: Update service update details
 *     description: Modify an existing service update with new information.
 *     tags: [ServiceUpdates]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Service update ID to modify
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               description:
 *                 type: string
 *                 example: Updated brake system maintenance
 *               mediaUrls:
 *                 type: array
 *                 items:
 *                   type: string
 *                   example: http://example.com/updated_image.jpg
 *               requiresApproval:
 *                 type: boolean
 *                 example: false
 *     responses:
 *       200:
 *         description: Service update updated successfully.
 *       404:
 *         description: Service update not found.
 */
serviceUpdateRouter.put("/service-update/:id", updateServiceUpdate);

/**
 * @swagger
 * /service-update/{id}:
 *   delete:
 *     summary: Delete a service update
 *     description: Remove a service update by ID.
 *     tags: [ServiceUpdates]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Service update ID to delete
 *     responses:
 *       200:
 *         description: Service update deleted successfully.
 *       404:
 *         description: Service update not found.
 */
serviceUpdateRouter.delete("/service-update/:id", deleteServiceUpdate);

/**
 * @swagger
 * /service-update/{id}/approval:
 *   patch:
 *     summary: Update approval status for a service update
 *     description: Approve or reject a service update based on its approval requirement.
 *     tags: [ServiceUpdates]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Service update ID to modify approval status
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               approved:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Approval status updated successfully.
 *       400:
 *         description: Service update does not require approval or invalid approval status.
 *       404:
 *         description: Service update not found.
 */
serviceUpdateRouter.patch("/service-update/:id/approval", updateApprovalStatus);

/**
 * @swagger
 * /service-booking/{bookingId}/updates:
 *   get:
 *     summary: Retrieve service updates for a specific service booking
 *     description: Get all service updates related to a specific service booking.
 *     tags: [ServiceUpdates]
 *     parameters:
 *       - in: path
 *         name: bookingId
 *         required: true
 *         schema:
 *           type: string
 *         description: Service booking ID to get updates
 *     responses:
 *       200:
 *         description: Successfully retrieved service updates for booking.
 *       404:
 *         description: Service booking not found.
 */
serviceUpdateRouter.get(
  "/service-booking/:bookingId/updates",
  getServiceUpdatesByBooking
);

/**
 * @swagger
 * /service-update/approval/pending:
 *   get:
 *     summary: Retrieve pending service updates requiring approval
 *     description: Get service updates that are waiting for user approval.
 *     tags: [ServiceUpdates]
 *     responses:
 *       200:
 *         description: Successfully retrieved pending approval service updates.
 *       500:
 *         description: Internal server error.
 */
serviceUpdateRouter.get(
  "/service-update/approval/pending",
  getPendingApprovals
);

export default serviceUpdateRouter;
