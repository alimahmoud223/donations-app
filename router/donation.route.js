import express from "express";
import { validateDonation } from "../middleware/validateDonation.js";
// import authMiddleware from "../middleware/auth.middleware.js";
import protect from "../middleware/auth.middleware.js";
import { isAdmin } from "../middleware/authAdmin.js";

import {
  createDonation,
  confirmDonation,
  refundDonation,
  getCampaignDonations
} from "../controller/donation.controller.js";

const router = express.Router();

// Protected routes (require login)
router.post("/", protect, validateDonation, createDonation);
router.patch("/confirm/:id", protect, isAdmin, confirmDonation);
router.patch("/refund/:id", protect, isAdmin, refundDonation);

// Public route
router.get("/campaign/:campaignId", getCampaignDonations);

export default router;