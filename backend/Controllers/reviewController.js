import Review from "../Models/ReviewModel.js";

export const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ isActive: true }).sort({ createdAt: -1 });
    return res.status(200).json({ success: true, data: reviews });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
  }
};

export const createReview = async (req, res) => {
  try {
    const { clientName, quote, company, role, avatarUrl, rating } = req.body;

    if (!clientName || !quote) {
      return res.status(400).json({ success: false, message: "Client name and quote are required." });
    }

    const review = await Review.create({ clientName, quote, company, role, avatarUrl, rating });
    return res.status(201).json({ success: true, message: "Review created", data: review });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
  }
};
