import express from 'express';
import {
    getInvoices,
    getInvoiceById,
    createInvoice,
    updateInvoice,
    deleteInvoice,
    updatePaymentStatus,
    getInvoicesByDateRange,
    getInvoicesByUser,
} from '../controllers/invoiceController.js';

const invoiceRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Invoices
 *   description: API for managing service invoices and payments
 */

/**
 * @swagger
 * /invoice:
 *   get:
 *     summary: Retrieve all invoices
 *     description: Get a list of all invoices with optional payment status filter
 *     tags: [Invoices]
 *     parameters:
 *       - in: query
 *         name: paymentStatus
 *         schema:
 *           type: string
 *           enum: [pending, paid, cancelled]
 *         description: Filter invoices by payment status
 *     responses:
 *       200:
 *         description: Successfully retrieved invoices
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
 *                       items:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             description:
 *                               type: string
 *                             amount:
 *                               type: number
 *                       totalAmount:
 *                         type: number
 *                       paymentStatus:
 *                         type: string
 *                         enum: [pending, paid, cancelled]
 *                       paymentMethod:
 *                         type: string
 *                         enum: [cash, card, bank_transfer]
 *                       transactionId:
 *                         type: string
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *       500:
 *         description: Internal Server Error
 */
invoiceRouter.get('/invoice', getInvoices);

/**
 * @swagger
 * /invoice/{id}:
 *   get:
 *     summary: Get a specific invoice
 *     description: Retrieve detailed information about a specific invoice by its ID
 *     tags: [Invoices]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Invoice ID
 *     responses:
 *       200:
 *         description: Successfully retrieved the invoice
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
 *                             price:
 *                               type: number
 *                         additionalServices:
 *                           type: array
 *                           items:
 *                             type: object
 *                             properties:
 *                               name:
 *                                 type: string
 *                               price:
 *                                 type: number
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
 *                                   price:
 *                                     type: number
 *                               quantity:
 *                                 type: number
 *                     items:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           description:
 *                             type: string
 *                           amount:
 *                             type: number
 *                     totalAmount:
 *                       type: number
 *                     paymentStatus:
 *                       type: string
 *                       enum: [pending, paid, cancelled]
 *                     paymentMethod:
 *                       type: string
 *                       enum: [cash, card, bank_transfer]
 *                     transactionId:
 *                       type: string
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *       404:
 *         description: Invoice not found
 *       500:
 *         description: Internal Server Error
 */
invoiceRouter.get("/invoice/:id", getInvoiceById);

/**
 * @swagger
 * /invoice:
 *   post:
 *     summary: Create a new invoice
 *     description: Create a new invoice for a service booking
 *     tags: [Invoices]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - serviceBooking
 *               - items
 *               - totalAmount
 *             properties:
 *               serviceBooking:
 *                 type: string
 *                 description: ID of the associated service booking
 *               items:
 *                 type: array
 *                 description: List of invoice items
 *                 items:
 *                   type: object
 *                   required:
 *                     - description
 *                     - amount
 *                   properties:
 *                     description:
 *                       type: string
 *                       description: Description of the service or item
 *                     amount:
 *                       type: number
 *                       description: Cost of the item
 *               totalAmount:
 *                 type: number
 *                 description: Total invoice amount
 *               paymentMethod:
 *                 type: string
 *                 enum: [cash, card, bank_transfer]
 *                 description: Method of payment
 *               transactionId:
 *                 type: string
 *                 description: Payment transaction ID (if applicable)
 *     responses:
 *       201:
 *         description: Invoice created successfully
 *       400:
 *         description: Invalid input data or invoice already exists for the booking
 *       404:
 *         description: Service booking not found
 *       500:
 *         description: Internal Server Error
 */
invoiceRouter.post("/invoice", createInvoice);

/**
 * @swagger
 * /invoice/{id}:
 *   put:
 *     summary: Update an invoice
 *     description: Update details of an existing invoice
 *     tags: [Invoices]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Invoice ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     description:
 *                       type: string
 *                     amount:
 *                       type: number
 *               totalAmount:
 *                 type: number
 *               paymentMethod:
 *                 type: string
 *                 enum: [cash, card, bank_transfer]
 *               transactionId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Invoice updated successfully
 *       404:
 *         description: Invoice not found
 *       500:
 *         description: Internal Server Error
 */
invoiceRouter.put("/invoice/:id", updateInvoice);

/**
 * @swagger
 * /invoice/{id}:
 *   delete:
 *     summary: Delete an invoice
 *     description: Remove an invoice from the system
 *     tags: [Invoices]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Invoice ID
 *     responses:
 *       200:
 *         description: Invoice deleted successfully
 *       404:
 *         description: Invoice not found
 *       500:
 *         description: Internal Server Error
 */
invoiceRouter.delete("/invoice/:id", deleteInvoice);

/**
 * @swagger
 * /invoice/{id}/payment:
 *   patch:
 *     summary: Update invoice payment status
 *     description: Update the payment status of an invoice
 *     tags: [Invoices]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Invoice ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - paymentStatus
 *             properties:
 *               paymentStatus:
 *                 type: string
 *                 enum: [pending, paid, cancelled]
 *                 description: New payment status
 *               paymentMethod:
 *                 type: string
 *                 enum: [cash, card, bank_transfer]
 *                 description: Method of payment
 *               transactionId:
 *                 type: string
 *                 description: Payment transaction ID
 *     responses:
 *       200:
 *         description: Payment status updated successfully
 *       400:
 *         description: Invalid payment status
 *       404:
 *         description: Invoice not found
 *       500:
 *         description: Internal Server Error
 */
invoiceRouter.patch("/invoice/:id/payment", updatePaymentStatus);

/**
 * @swagger
 * /invoice/search/date:
 *   get:
 *     summary: Search invoices by date range
 *     description: Retrieve invoices within a specified date range
 *     tags: [Invoices]
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
 *         description: Successfully retrieved invoices in date range
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
 *                     $ref: '#/components/schemas/Invoice'
 *       400:
 *         description: Invalid date format or range
 *       500:
 *         description: Internal Server Error
 */
invoiceRouter.get("/invoice/search/date", getInvoicesByDateRange);

/**
 * @swagger
 * /user/{userId}/invoices:
 *   get:
 *     summary: Get invoices by user
 *     description: Retrieve all invoices for a specific user
 *     tags: [Invoices]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID to get invoices for
 *     responses:
 *       200:
 *         description: Successfully retrieved user's invoices
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
 *                     $ref: '#/components/schemas/Invoice'
 *       500:
 *         description: Internal Server Error
 */
invoiceRouter.get("/user/:userId/invoices", getInvoicesByUser);

export default invoiceRouter;
