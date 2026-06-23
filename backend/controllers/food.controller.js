import foodModel from "../src/models/food.model.js";
import uploadOnCloudinary from "../src/utils/cloudinary.js";

export const createfood = async(req,res) =>{
   try {
     const {name, description, price} = req.body;
 
     let url =null;
     if(req.file){
         const res = await uploadOnCloudinary(req.file.path);
         url = res.secure_url
         
     }
 
     const food = await foodModel.create({
         name,
         description,
         price,
         photo:url,
     });
     res.status(201).json({
         message:"food created",
         success:true,
         food
     })
   } catch (error) {
    res.status(500).json({
        message:"internal server error",
        success:false
    })
    
   }
    
};

export const getFoods = async (req, res) => {
  try {
    const foods = await foodModel.find();

    if (foods.length === 0) {
      return res.status(404).json({
        message: "Food not found",
        success: false,
      });
    }

    res.status(200).json({
      message: "Foods fetched successfully",
      success: true,
      foods,
    });

  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};
