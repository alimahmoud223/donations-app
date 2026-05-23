import express from "express";
// import authMiddleware from "../middleware/auth.middleware.js";
import authorize from "../middleware/authorization.middleware.js";
import authMiddleware from "../middleware/auth.middleware.js";

import {
  getAllCampaigns,
  createCampaign,
  getCampaign,
  updateCampaign,
  deleteCampaign,
} from "../controller/campaign.controller.js";

const router = express.Router();

router.get("/", getAllCampaigns);
router.get("/:id", getCampaign);

router.post("/", authMiddleware, authorize("admin"), createCampaign);
router.patch("/:id", authMiddleware, authorize("admin"), updateCampaign);
router.delete("/:id", authMiddleware, authorize("admin"), deleteCampaign);

export default router;
