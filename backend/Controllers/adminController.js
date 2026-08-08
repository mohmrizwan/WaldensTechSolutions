import bcrypt from "bcrypt";
import Admin from "../Models/admin.js";
import jwt from "jsonwebtoken";
import { generateToken } from "../Utils/generateToken.js";

export const RegisterAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please enter all required fields",
      });
    }

    const isAdmin = await Admin.findOne({ email });

    if (isAdmin) {
      return res
        .status(409)
        .json({ message: "Admin with same id already exist" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const adminCreated = await Admin.create({
      email,
      name,
      password: hashedPassword,
    });

    const adminResponse = {
      _id: adminCreated._id,
      name: adminCreated.name,
      email: adminCreated.email,
      role: adminCreated.role,
    };

    return res.status(201).json({
      success: true,
      message: "Admin created successfully",
      admin: adminResponse,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate Input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please enter all required fields",
      });
    }

    // Check Admin
    const adminExist = await Admin.findOne({ email });

    if (!adminExist) {
      return res.status(404).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Compare Password
    const isMatch = await bcrypt.compare(password, adminExist.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Generate JWT
    const token = generateToken(adminExist);

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    console.log("TOKEN CREATED:", token);
    console.log("COOKIE SET");

    // Success Response
    return res.status(200).json({
      success: true,
      message: "Login Successful",
      admin: {
        _id: adminExist._id,
        name: adminExist.name,
        email: adminExist.email,
        role: adminExist.role,
      },
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const logoutAdmin = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getCurrentAdmin = async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      admin: req.admin,
    });
  } catch (error) {
    console.error("Current Admin Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
