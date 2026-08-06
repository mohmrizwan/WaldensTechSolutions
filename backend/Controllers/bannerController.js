import Banner from "../Models/BannerModel.js";

export const createBanner = async (req, res) => {
  try {
    const {
      title,
      highlight,
      subtitle,
      primaryCtaText,
      primaryCtaUrl,
      secondaryCtaText,
      secondaryCtaUrl,
      cards,
    } = req.body;

    if (!title || !highlight || !subtitle || !primaryCtaText || !secondaryCtaText) {
      return res.status(400).json({ success: false, message: "Missing required banner fields" });
    }

    const banner = await Banner.create({
      title,
      highlight,
      subtitle,
      primaryCtaText,
      primaryCtaUrl,
      secondaryCtaText,
      secondaryCtaUrl,
      cards: Array.isArray(cards) ? cards : [],
    });

    return res.status(201).json({ success: true, message: "Banner created", data: banner });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
  }
};

export const getBanner = async (req, res) => {
  try {
    const banner = await Banner.findOne({ isActive: true }).sort({ updatedAt: -1 });
    if (!banner) {
      return res.status(404).json({ success: false, message: "No banner found" });
    }

    return res.status(200).json({ success: true, data: banner });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
  }
};

export const updateBanner = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const banner = await Banner.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!banner) {
      return res.status(404).json({ success: false, message: "Banner not found" });
    }

    return res.status(200).json({ success: true, message: "Banner updated", data: banner });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
  }
};

export const deleteBanner = async (req, res) => {
  try {
    const { id } = req.params;
    const banner = await Banner.findByIdAndDelete(id);

    if (!banner) {
      return res.status(404).json({ success: false, message: "Banner not found" });
    }

    return res.status(200).json({ success: true, message: "Banner deleted", data: banner });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
  }
};
