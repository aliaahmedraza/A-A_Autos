import express from "express";
import {
  getServicePackages,
  getServicePackageById,
  createServicePackage,
  updateServicePackage,
  deleteServicePackage,
  searchServicePackages,
  getServicePackagesByPriceRange,
} from "../controllers/servicePackageController.js";

const servicePackageRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Service Packages
 *   description: API for managing service packages and maintenance plans
 */

/**
 * @swagger
 * /service-package:
 *   get:
 *     summary: Retrieve a list of service packages
 *     description: Get all service packages sorted by name
 *     tags: [Service Packages]
 *     responses:
 *       200:
 *         description: Successfully retrieved service packages
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
 *                         example: Basic Service
 *                       description:
 *                         type: string
 *                         example: Regular maintenance service including oil change and basic inspection
 *                       price:
 *                         type: number
 *                         example: 2500
 *       500:
 *         description: Internal Server Error
 */
servicePackageRouter.get("/service-package", getServicePackages);

/**
 * @swagger
 * /service-package/{id}:
 *   get:
 *     summary: Retrieve a single service package by ID
 *     description: Get detailed information about a specific service package
 *     tags: [Service Packages]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Service Package ID
 *     responses:
 *       200:
 *         description: Successfully retrieved the service package
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
 *                     name:
 *                       type: string
 *                       example: Basic Service
 *                     description:
 *                       type: string
 *                       example: Regular maintenance service including oil change and basic inspection
 *                     price:
 *                       type: number
 *                       example: 2500
 *       404:
 *         description: Service package not found
 *       500:
 *         description: Internal Server Error
 */
servicePackageRouter.get("/service-package/:id", getServicePackageById);

/**
 * @swagger
 * /service-package:
 *   post:
 *     summary: Create a new service package
 *     description: Create a new service package with name, description, and price
 *     tags: [Service Packages]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *               - price
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the service package
 *                 example: Basic Service
 *               description:
 *                 type: string
 *                 description: Detailed description of the service package
 *                 example: Regular maintenance service including oil change and basic inspection
 *               price:
 *                 type: number
 *                 description: Price of the service package (must be non-negative)
 *                 example: 2500
 *     responses:
 *       201:
 *         description: Service package created successfully
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
 *                   example: Service package created successfully
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
 *       400:
 *         description: Invalid input data or package name already exists
 *       500:
 *         description: Internal Server Error
 */
servicePackageRouter.post("/service-package", createServicePackage);

/**
 * @swagger
 * /service-package/{id}:
 *   put:
 *     summary: Update a service package
 *     description: Update details of an existing service package
 *     tags: [Service Packages]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Service Package ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Updated name of the service package
 *               description:
 *                 type: string
 *                 description: Updated description of the service package
 *               price:
 *                 type: number
 *                 description: Updated price (must be non-negative)
 *     responses:
 *       200:
 *         description: Service package updated successfully
 *       400:
 *         description: Invalid input data or name conflict
 *       404:
 *         description: Service package not found
 *       500:
 *         description: Internal Server Error
 */
servicePackageRouter.put("/service-package/:id", updateServicePackage);

/**
 * @swagger
 * /service-package/{id}:
 *   delete:
 *     summary: Delete a service package
 *     description: Remove a service package from the system
 *     tags: [Service Packages]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Service Package ID
 *     responses:
 *       200:
 *         description: Service package deleted successfully
 *       404:
 *         description: Service package not found
 *       500:
 *         description: Internal Server Error
 */
servicePackageRouter.delete("/service-package/:id", deleteServicePackage);

/**
 * @swagger
 * /service-package/search/query:
 *   get:
 *     summary: Search service packages
 *     description: Search service packages by name or description
 *     tags: [Service Packages]
 *     parameters:
 *       - in: query
 *         name: q
 *         required: true
 *         schema:
 *           type: string
 *         description: Search query string
 *     responses:
 *       200:
 *         description: Successfully retrieved matching service packages
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
 *                       name:
 *                         type: string
 *                       description:
 *                         type: string
 *                       price:
 *                         type: number
 *       500:
 *         description: Internal Server Error
 */
servicePackageRouter.get(
  "/service-package/search/query",
  searchServicePackages
);

/**
 * @swagger
 * /service-package/filter/price:
 *   get:
 *     summary: Get service packages by price range
 *     description: Retrieve service packages within a specified price range
 *     tags: [Service Packages]
 *     parameters:
 *       - in: query
 *         name: min
 *         required: true
 *         schema:
 *           type: number
 *         description: Minimum price
 *       - in: query
 *         name: max
 *         required: true
 *         schema:
 *           type: number
 *         description: Maximum price
 *     responses:
 *       200:
 *         description: Successfully retrieved service packages within price range
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
 *                       name:
 *                         type: string
 *                       description:
 *                         type: string
 *                       price:
 *                         type: number
 *       400:
 *         description: Invalid price range
 *       500:
 *         description: Internal Server Error
 */
servicePackageRouter.get(
  "/service-package/filter/price",
  getServicePackagesByPriceRange
);

export default servicePackageRouter;
