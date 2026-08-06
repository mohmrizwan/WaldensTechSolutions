const adminMiddleware = (req, res, next) => {

    try {

        // Check user role
        if (req.user.role !== "admin") {
            return res.status(403).json({
                message: "Admin access denied"
            });
        }

        next();

    } catch (error) {
        return res.status(500).json({
            message: "Admin verification failed",
            error: error.message
        });
    }
};

export default adminMiddleware;