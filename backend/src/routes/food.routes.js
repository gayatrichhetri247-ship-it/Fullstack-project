import express from "express";
import { createfood, getFoods } from "../../controllers/food.controller.js";
import upload from "../middlewares/upload.middleware.js";

const foodRoutes = express.Router();

foodRoutes.route("/create").post(upload.single("image"), createfood);
foodRoutes.route("/").get(getFoods);

export default foodRoutes;