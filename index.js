import express from "express";
import campaignRouter from "./router/campaign.route.js";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import usersRoute from "./router/users.route.js";
import donationRoutes from "./router/donation.route.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/users", usersRoute);
app.use("/campaigns", campaignRouter);
app.use("/donations", donationRoutes);


app.use(/.*/, (req, res) => {
  res.status(404).json({ message: `${req.baseUrl} Route Not Found` });
});

app.use((err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";
  res.status(statusCode).json({ message });
});

let port = process.env.PORT || 3000;

async function startApp() {
  try {
    console.log("Trying to connect to DB...");

    await mongoose.connect(process.env.DB_URI, {
      serverSelectionTimeoutMS: 10000,
      family: 4,
    });

    console.log("DB Connected");

    app.listen(port, () => {
      console.log("Server Started");
    });
  } catch (err) {
    console.log("DB Error:");
    console.log(err.message);
  }
}

startApp();