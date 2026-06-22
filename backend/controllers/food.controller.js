export const createfood = (req,res) =>{
    console.log(req.body)
    console.log(req.file)
    res.send("Food created");
};
