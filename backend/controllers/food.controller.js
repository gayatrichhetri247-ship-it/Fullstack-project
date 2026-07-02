import foodModel from "../src/models/food.model.js";
import uploadOnCloudinary from "../src/utils/cloudinary.js";
import { success } from "./order.controller.js";

export const createfood = async (req, res) => {
  try {
    const { name, description, price } = req.body;

    let url = null;
    if (req.file) {
      const res = await uploadOnCloudinary(req.file.path);
      url = res.secure_url;
    }

    const food = await foodModel.create({
      name,
      description,
      price,
      photo: url,
    });
    res.status(201).json({
      message: "food created",
      success: true,
      food,
    });
  } catch (error) {
    res.status(500).json({
      message: "internal server error",
      success: false,
    });
  }
};

export const getFoods = async (req, res) => {
  try {
    const foods = await foodModel.find();

    return res.status(200).json({
      success: true,
      foods,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
export const deleteFood = async (req, res) => {
  try {
    const id = req.params.id;
    await foodModel.findByIdAndDelete(id);
    return res.status(200).json({
      message: "Food deleted",
      success: true,
    });
  } catch {
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};
export const editFood = async (req, res) => {
  try {
    const id = req.params.id;
    const food = await foodModel.findById(id);
    const { name, description, price } = req.body;

    let url = food.photo || null;
    if (req.file) {
      const response = await uploadOnCloudinary(req.file.path);
      url = response.secure_url;
    }
    const updatedFood = await foodModel.findByIdAndUpdate(id, {
      name,
      description,
      price,
      photo: url,
    },{new:true});
    res.status(200).json({
      message: "Food Edited",
      success: true,
      food: updatedFood,
    });
  } catch {
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};
