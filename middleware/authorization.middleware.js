import { AppError } from "../utils/AppError.js";

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return next(new AppError(401, "Unauthorized"));
    }

    if (!roles.includes(req.user.role)) {
      return next(new AppError(403, "Forbidden"));
    }

    next();
  };
};

export default authorize;