const authMiddleware = async (req, res, next) => {
  try {
    console.log("COOKIES:", req.cookies);
    console.log("TOKEN:", req.cookies?.token ? "TOKEN FOUND" : "NO TOKEN");

    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log("DECODED TOKEN:", decoded);

    const admin = await Admin.findById(decoded.id).select("-password");

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    req.user = decoded;
    req.admin = admin;

    next();

  } catch (error) {
    console.error("AUTH ERROR:", error);

    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

export default authMiddleware;