import ServiceModel from "../Models/ServiceModel.js";

export const createService = async (req, res) => {
  try {
    const { title, description, icon } = req.body;

    if (!title || !description || !icon) {
      return res.status(400).json({ message: "Enter Required Fields" });
    }
    const isTitle = await ServiceModel.findOne({ title });
    if (isTitle) {
      return res.status(409).json({ message: "This Service Already Exist" });
    }

    const isDescription = await ServiceModel.findOne({ description });
    if (isDescription) {
      return res
        .status(409)
        .json({ message: "This Description Already Exist" });
    }

    const serviceCreate = await ServiceModel.create({
      title,
      description,
      icon,
    });

    res.status(201).json({ message: "Service Created", serviceCreate });
  } catch (error) {
    res.status(500).josn({ message: "Internal Server Error" });
  }
};

export const getAllService = async (req, res) => {
  try {
    const getService = await ServiceModel.find();

    if (getService.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No services found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Services fetched successfully",
      data: getService,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
export const updateService = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, icon, isActive } = req.body;

    const serviceUpdate = await ServiceModel.findByIdAndUpdate(
      id,
      {
        title,
        description,
        icon,
        isActive,
      },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!serviceUpdate) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Service updated successfully",
      data: serviceUpdate,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const deleteService = async (req, res) => {
  try {
    const { id } = req.params;

    const deleteService = await ServiceModel.findByIdAndDelete(id);

    if (!deleteService) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Service Deleted Successfully",
      data: deleteService,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
