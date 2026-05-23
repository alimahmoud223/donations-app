import express from "express";
const router=express.Router()
import {signUp,signIn,getMyDonations} from "../controller/users.controller.js"
import {ValidateSignUp,ValidateSignIn}from "../middleware/users.middleware.js"
import protect from "../middleware/auth.middleware.js";
router.post("/signup",ValidateSignUp,signUp)
router.post("/signin",ValidateSignIn,signIn)
router.get("/my-donations", protect, getMyDonations);
export default router;