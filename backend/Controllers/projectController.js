import Project from "../Models/ProjectModel.js";
import cloudinary from "../Config/cloudinary.js";

const uploadProjectImage = (buffer) =>
  new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: "walden/projects", resource_type: "image" },
      (error, result) => {
        if (error) {
          return reject(error);
        }

        return resolve(result.secure_url);
      },
    );

    uploadStream.end(buffer);
  });

const normalizeProjectUrl = (value) => {
  const projectUrl = typeof value === "string" ? value.trim() : "";

  if (!projectUrl) {
    return "/project";
  }

  if (projectUrl.startsWith("/")) {
    return projectUrl;
  }

  try {
    const url = new URL(projectUrl);
    if (!["http:", "https:"].includes(url.protocol)) {
      return null;
    }
    return url.toString();
  } catch {
    return null;
  }
};

export const createProject = async (req, res) => {
  try {
    const { name, client, category, description, status, startDate, endDate, imageUrl, projectUrl } = req.body;
    const normalizedProjectUrl = normalizeProjectUrl(projectUrl);
    const uploadedImageUrl = req.file ? await uploadProjectImage(req.file.buffer) : imageUrl;

    if (!name || !client || !description) {
      return res.status(400).json({ success: false, message: "Name, client, and description are required." });
    }

    if (!normalizedProjectUrl) {
      return res.status(400).json({ success: false, message: "Project URL must be a relative path or an http(s) URL." });
    }

    const existing = await Project.findOne({ name });
    if (existing) {
      return res.status(409).json({ success: false, message: "A project with this name already exists." });
    }

    const project = await Project.create({
      name,
      client,
      category,
      description,
      status,
      startDate: startDate ? new Date(startDate) : undefined,
      endDate: endDate ? new Date(endDate) : undefined,
      imageUrl: uploadedImageUrl,
      projectUrl: normalizedProjectUrl,
    });

    return res.status(201).json({ success: true, message: "Project created", data: project });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
  }
};

export const getProjects = async (req, res) => {
  try {
    const { page = 1, limit = 12, search = "" } = req.query;
    const filter = { isActive: true };

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { client: { $regex: search, $options: "i" } },
        { category: { $regex: search, $options: "i" } },
      ];
    }

    const total = await Project.countDocuments(filter);
    const projects = await Project.find(filter)
      .sort({ createdAt: -1 })
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit));

    return res.status(200).json({
      success: true,
      data: projects,
      total,
      totalPages: Math.max(1, Math.ceil(total / Number(limit))),
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
  }
};

export const getProjectById = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findById(id);

    if (!project) {
      return res.status(404).json({ success: false, message: "Project not found" });
    }

    return res.status(200).json({ success: true, data: project });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
  }
};

export const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = { ...req.body };

    if (req.file) {
      updates.imageUrl = await uploadProjectImage(req.file.buffer);
    }

    if ("projectUrl" in updates) {
      updates.projectUrl = normalizeProjectUrl(updates.projectUrl);
      if (!updates.projectUrl) {
        return res.status(400).json({ success: false, message: "Project URL must be a relative path or an http(s) URL." });
      }
    }

    const project = await Project.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!project) {
      return res.status(404).json({ success: false, message: "Project not found" });
    }

    return res.status(200).json({ success: true, message: "Project updated", data: project });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findByIdAndDelete(id);

    if (!project) {
      return res.status(404).json({ success: false, message: "Project not found" });
    }

    return res.status(200).json({ success: true, message: "Project deleted", data: project });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
  }
};
