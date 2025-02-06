import express from "express";
import {
  getServiceReports,
  getServiceReportById,
  createServiceReport,
  updateServiceReport,
  deleteServiceReport,
  getServiceReportsByDateRange,
  getServiceReportsByUser,
  getServiceReportsByBike,
} from "../controllers/serviceReportController.js";

const serviceReportRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Service Reports
 *   description: API for managing service reports and maintenance records
 */

/**
 * @swagger
 * /service-report:
 *   get:
 *     summary: Retrieve a list of service reports
 *     description: Get all service reports with user and bike details
 *     tags: [Service Reports]
 *     responses:
 *       200:
 *         description: Successfully retrieved service reports
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
 *                       serviceBooking:
 *                         type: object
 *                         properties:
 *                           user:
 *                             type: object
 *                             properties:
 *                               username:
 *                                 type: string
 *                               email:
 *                                 type: string
 *                           bike:
 *                             type: object
 *                             properties:
 *                               model:
 *                                 type: string
 *                               brand:
 *                                 type: string
 *                               registrationNumber:
 *                                 type: string
 *                       reportDetails:
 *                         type: string
 *                       mediaUrls:
 *                         type: array
 *                         items:
 *                           type: string
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *       500:
 *         description: Internal Server Error
 */
serviceReportRouter.get("/service-report", getServiceReports);

/**
 * @swagger
 * /service-report/{id}:
 *   get:
 *     summary: Retrieve a single service report by ID
 *     description: Get detailed information about a specific service report including user, bike, and service details
 *     tags: [Service Reports]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Service Report ID
 *     responses:
 *       200:
 *         description: Successfully retrieved the service report
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
 *                     serviceBooking:
 *                       type: object
 *                       properties:
 *                         user:
 *                           type: object
 *                           properties:
 *                             username:
 *                               type: string
 *                             email:
 *                               type: string
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
 *                         sparePartsUsed:
 *                           type: array
 *                           items:
 *                             type: object
 *                             properties:
 *                               sparePart:
 *                                 type: object
 *                                 properties:
 *                                   name:
 *                                     type: string
 *                     reportDetails:
 *                       type: string
 *                     mediaUrls:
 *                       type: array
 *                       items:
 *                         type: string
 *       404:
 *         description: Service report not found
 *       500:
 *         description: Internal Server Error
 */
serviceReportRouter.get("/service-report/:id", getServiceReportById);

/**
 * @swagger
 * /service-report:
 *   post:
 *     summary: Create a new service report
 *     description: Create a new service report for a completed service booking
 *     tags: [Service Reports]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - serviceBooking
 *               - reportDetails
 *             properties:
 *               serviceBooking:
 *                 type: string
 *                 description: Service Booking ID
 *               reportDetails:
 *                 type: string
 *                 description: Detailed report of the service performed
 *               mediaUrls:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: uri
 *                 description: Optional list of media URLs (images, documents)
 *     responses:
 *       201:
 *         description: Service report created successfully
 *       400:
 *         description: Invalid input data or report already exists
 *       404:
 *         description: Service booking not found
 *       500:
 *         description: Internal Server Error
 */
serviceReportRouter.post("/service-report", createServiceReport);

/**
 * @swagger
 * /service-report/{id}:
 *   put:
 *     summary: Update a service report
 *     description: Update details of an existing service report
 *     tags: [Service Reports]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Service Report ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               reportDetails:
 *                 type: string
 *                 description: Updated report details
 *               mediaUrls:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: uri
 *                 description: Updated list of media URLs
 *     responses:
 *       200:
 *         description: Service report updated successfully
 *       400:
 *         description: Invalid input data
 *       404:
 *         description: Service report not found
 *       500:
 *         description: Internal Server Error
 */
serviceReportRouter.put("/service-report/:id", updateServiceReport);

/**
 * @swagger
 * /service-report/{id}:
 *   delete:
 *     summary: Delete a service report
 *     description: Remove a service report from the system
 *     tags: [Service Reports]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Service Report ID
 *     responses:
 *       200:
 *         description: Service report deleted successfully
 *       404:
 *         description: Service report not found
 *       500:
 *         description: Internal Server Error
 */
serviceReportRouter.delete("/service-report/:id", deleteServiceReport);

/**
 * @swagger
 * /service-report/search/date:
 *   get:
 *     summary: Get service reports by date range
 *     description: Retrieve service reports within a specified date range
 *     tags: [Service Reports]
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
 *         description: Successfully retrieved service reports within date range
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
 *                       reportDetails:
 *                         type: string
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *       400:
 *         description: Invalid date format or range
 *       500:
 *         description: Internal Server Error
 */
serviceReportRouter.get(
  "/service-report/search/date",
  getServiceReportsByDateRange
);

/**
 * @swagger
 * /user/{userId}/service-reports:
 *   get:
 *     summary: Get service reports by user
 *     description: Retrieve all service reports for a specific user
 *     tags: [Service Reports]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID to get reports for
 *     responses:
 *       200:
 *         description: Successfully retrieved user's service reports
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
 *                       reportDetails:
 *                         type: string
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *       500:
 *         description: Internal Server Error
 */
serviceReportRouter.get(
  "/user/:userId/service-reports",
  getServiceReportsByUser
);

/**
 * @swagger
 * /bike/{bikeId}/service-reports:
 *   get:
 *     summary: Get service reports by bike
 *     description: Retrieve all service reports for a specific bike
 *     tags: [Service Reports]
 *     parameters:
 *       - in: path
 *         name: bikeId
 *         required: true
 *         schema:
 *           type: string
 *         description: Bike ID to get reports for
 *     responses:
 *       200:
 *         description: Successfully retrieved bike's service reports
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
 *                       reportDetails:
 *                         type: string
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *       500:
 *         description: Internal Server Error
 */
serviceReportRouter.get(
  "/bike/:bikeId/service-reports",
  getServiceReportsByBike
);

export default serviceReportRouter;
