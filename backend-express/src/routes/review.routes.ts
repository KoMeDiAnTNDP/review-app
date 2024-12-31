import { Router } from "express";
import { ReviewService } from "../services/review.service";
import {
  CreateReviewDto,
  UpdateReviewDto,
  GetReviewsDto,
} from "../dto/review.dto";
import { validateRequest } from "../middleware/validation";

const router = Router();
const reviewService = new ReviewService();

class ReviewError extends Error {
    constructor(message: string) {
      super(message);
      this.name = 'ReviewError';
    }
  }

/**
 * @openapi
 * /reviews:
 *   post:
 *     tags:
 *       - Reviews
 *     summary: Create a new review
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - content
 *               - rating
 *               - author
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               rating:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 5
 *               author:
 *                 type: string
 *     responses:
 *       200:
 *         description: Review created successfully
 *       400:
 *         description: Invalid input data
 */
router.post("/", validateRequest(CreateReviewDto), async (req, res, next) => {
  try {
    const result = await reviewService.create(req.body);
    res.json(result);
  } catch (error) {
    next(error);
  }
});
/**
 * @openapi
 * /reviews:
 *   get:
 *     tags:
 *       - Reviews
 *     summary: Get all reviews with pagination and filters
 *     parameters:
 *       - in: query
 *         name: skip
 *         schema:
 *           type: integer
 *           minimum: 0
 *         description: Number of records to skip
 *       - in: query
 *         name: take
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 200
 *         description: Number of records to take
 *       - in: query
 *         name: author
 *         schema:
 *           type: string
 *         description: Filter by author name
 *       - in: query
 *         name: rating
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 5
 *         description: Filter by rating
 *     responses:
 *       200:
 *         description: List of reviews
 */
router.get(
  "/",
  validateRequest(GetReviewsDto, "query"),
  async (req, res, next) => {
    try {
      const result = await reviewService.findAll(req.query);
      res.json(result);
    } catch (error) {
      next(error);
    }
  },
);

/**
 * @openapi
 * /reviews/{id}:
 *   get:
 *     tags:
 *       - Reviews
 *     summary: Get a review by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Review ID
 *     responses:
 *       200:
 *         description: Review details
 *       404:
 *         description: Review not found
 */
router.get("/:id", async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res
        .status(400)
        .json({ success: false, error: ["Invalid ID format"] });
    }
    const result = await reviewService.findOne(id);
    res.json(result);
  } catch (error) {
    if (error instanceof ReviewError && error.message === "Review not found") {
      res.status(404).json({ success: false, error: error.message });
    } else {
      next(error);
    }
  }
});

/**
 * @openapi
 * /reviews/{id}:
 *   put:
 *     tags:
 *       - Reviews
 *     summary: Update a review
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Review ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - content
 *               - rating
 *               - author
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               rating:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 5
 *               author:
 *                 type: string
 *     responses:
 *       200:
 *         description: Review updated successfully
 *       404:
 *         description: Review not found
 *       400:
 *         description: Invalid input data
 */
router.put("/:id", validateRequest(UpdateReviewDto), async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res
        .status(400)
        .json({ success: false, error: ["Invalid ID format"] });
    }
    const result = await reviewService.update(id, req.body);
    res.json(result);
  } catch (error) {
    if (error instanceof ReviewError && error.message === "Review not found") {
        res.status(404).json({ success: false, error: error.message });
      } else {
        next(error);
      }
  }
});

/**
 * @openapi
 * /reviews/{id}:
 *   delete:
 *     tags:
 *       - Reviews
 *     summary: Delete a review
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Review ID
 *     responses:
 *       200:
 *         description: Review deleted successfully
 *       404:
 *         description: Review not found
 */
router.delete("/:id", async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res
        .status(400)
        .json({ success: false, error: ["Invalid ID format"] });
    }
    const result = await reviewService.remove(id);
    res.json(result);
  } catch (error) {
    if (error instanceof ReviewError && error.message === "Review not found") {
        res.status(404).json({ success: false, error: error.message });
      } else {
        next(error);
      }
  }
});

export default router;
