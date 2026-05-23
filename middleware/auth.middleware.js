import jwt from "jsonwebtoken";
import { AppError } from "../utils/AppError.js";
import { catchAsync } from "../utils/catchAsync.js";
import User from "../model/users.model.js";

const authMiddleware = catchAsync(async (req, res, next) => {
  // let token = req.headers["authorization"];

  let token = req.headers["authorization"];
if (token && token.startsWith("Bearer ")) {
  token = token.split(" ")[1];
}

  if (!token) {
    return next(new AppError(401, "No token provided"));
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const user = await User.findById(decoded.id);
  if (!user) {
    return next(new AppError(401, "User not found"));
  }

  req.user = user;

  next();
});

export default authMiddleware;