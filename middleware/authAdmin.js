export const isAdmin = (req, res, next) => {
  try {
    // تأكد إن المستخدم موجود
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // تحقق من الـ role
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied - Admins only" });
    }

    next(); // كمل
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};