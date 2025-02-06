import express from "express";
import {
  getAdditionalServices,
  getAdditionalServiceById,
  createAdditionalService,
  updateAdditionalService,
  deleteAdditionalService,
  searchAdditionalServices,
  getServicesByPriceRange,
} from "../controllers/additionalServiceController.js";

const additionalServiceRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Additional Services
 *   description: API for managing optional/additional bike services
 */

/**
 * @swagger
 * /additional-service:
 *   get:
 *     summary: Retrieve all additional services
 *     description: Get a list of all available additional services sorted by name
 *     tags: [Additional Services]
 *     responses:
 *       200:
 *         description: Successfully retrieved additional services
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
 *                       name:
 *                         type: string
 *                         description: Name of the additional service
 *                       description:
 *                         type: string
 *                         description: Detailed description of the service
 *                       price:
 *                         type: number
 *                         description: Cost of the service
 *       500:
 *         description: Internal Server Error
 */
additionalServiceRouter.get("/additional-service", getAdditionalServices);

/**
 * @swagger
 * /additional-service/{id}:
 *   get:
 *     summary: Get a specific additional service
 *     description: Retrieve detailed information about a specific additional service by its ID
 *     tags: [Additional Services]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Additional Service ID
 *     responses:
 *       200:
 *         description: Successfully retrieved the additional service
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
 *                     name:
 *                       type: string
 *                     description:
 *                       type: string
 *                     price:
 *                       type: number
 *       404:
 *         description: Additional service not found
 *       500:
 *         description: Internal Server Error
 */
additionalServiceRouter.get("/additional-service/:id", getAdditionalServiceById);

/**
 * @swagger
 * /additional-service:
 *   post:
 *     summary: Create a new additional service
 *     description: Add a new additional service to the system
 *     tags: [Additional Services]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - price
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the service (must be unique)
 *               description:
 *                 type: string
 *                 description: Detailed description of what the service includes
 *               price:
 *                 type: number
 *                 description: Cost of the service (must be non-negative)
 *     responses:
 *       201:
 *         description: Additional service created successfully
 *       400:
 *         description: Invalid input data or service name already exists
 *       500:
 *         description: Internal Server Error
 */
additionalServiceRouter.post("/additional-service", createAdditionalService);

/**
 * @swagger
 * /additional-service/{id}:
 *   put:
 *     summary: Update an additional service
 *     description: Update details of an existing additional service
 *     tags: [Additional Services]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Additional Service ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: New name for the service
 *               description:
 *                 type: string
 *                 description: Updated service description
 *               price:
 *                 type: number
 *                 description: New price for the service (must be non-negative)
 *     responses:
 *       200:
 *         description: Additional service updated successfully
 *       400:
 *         description: Invalid input data or duplicate service name
 *       404:
 *         description: Additional service not found
 *       500:
 *         description: Internal Server Error
 */
additionalServiceRouter.put(
  "/additional-service/:id",
  updateAdditionalService
);

/**
 * @swagger
 * /additional-service/{id}:
 *   delete:
 *     summary: Delete an additional service
 *     description: Remove an additional service from the system
 *     tags: [Additional Services]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Additional Service ID
 *     responses:
 *       200:
 *         description: Additional service deleted successfully
 *       404:
 *         description: Additional service not found
 *       500:
 *         description: Internal Server Error
 */
additionalServiceRouter.delete(
  "/additional-service/:id",
  deleteAdditionalService
);

/**
 * @swagger
 * /additional-service/search/query:
 *   get:
 *     summary: Search additional services
 *     description: Search for additional services by name or description
 *     tags: [Additional Services]
 *     parameters:
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         description: Search query string
 *     responses:
 *       200:
 *         description: Successfully retrieved matching services
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
 *                     $ref: '#/components/schemas/AdditionalService'
 *       500:
 *         description: Internal Server Error
 */
additionalServiceRouter.get(
  "/additional-service/search/query",
  searchAdditionalServices
);

/**
 * @swagger
 * /additional-service/filter/price:
 *   get:
 *     summary: Filter services by price range
 *     description: Get additional services within a specified price range
 *     tags: [Additional Services]
 *     parameters:
 *       - in: query
 *         name: min
 *         schema:
 *           type: number
 *         description: Minimum price
 *       - in: query
 *         name: max
 *         schema:
 *           type: number
 *         description: Maximum price
 *     responses:
 *       200:
 *         description: Successfully retrieved services in price range
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
 *                     $ref: '#/components/schemas/AdditionalService'
 *       400:
 *         description: Invalid price range
 *       500:
 *         description: Internal Server Error
 */
additionalServiceRouter.get(
  "/additional-service/filter/price",
  getServicesByPriceRange
);

export default additionalServiceRouter;
