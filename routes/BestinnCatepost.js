const express = require("express");
const { Bestcate } = require("../model/categories/bestinn");
const router = express.Router()






router.get('/', async(req,res)=>{
    const categoryList = await Bestcate.find();

    if(!categoryList){
        res.status(500).json({success:false})
    }
    res.status(200).send(categoryList)
})


router.get('/:id', async(req,res)=>{
    const categoryList = await Bestcate.findById(req.params.id);

    if(!categoryList){
        res.status(500).json({message: "Category with this ID is found"})
    }
    res.status(200).send(categoryList)
})


router.post('/', async (req, res) => {
    try {
      const { name } = req.body; 
  
      const newCategory = new Bestcate({
        name: name,
      });
  
      // Save the category to the database
      const savedCategory = await newCategory.save();
  
      res.status(201).json(savedCategory);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });






router.put("/:id", async(req, res)=>{
    const category = await Bestcate.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            // icon: req.body.icon,
        },
        {
            new: true
        }
    )
    if(!category)
    return res.status(404).send("the category cannot be updated")

    res.send(category);
} )





router.delete("/:id",(req, res)=>{
    Category.findByIdAndRemove(req.params.id).then(cartegory=>{
        if(cartegory){
            return res.status(200).json({success:true, message:"the categorym is deleted successfully"})
        } else{
            return res.status(404).json({success: false, message: "category not found"})
        }
    }).catch(err=>{
        return res.status(400).json({success: false, error: err})
    })
})





module.exports = router;