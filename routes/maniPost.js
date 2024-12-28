const express = require('express');
const router = express.Router();
const Product = require('../model/mainPost'); // Adjust path as needed
const Bestcate = require('../model/categories/bestinn'); 
const multer = require('multer');
const cloudinary = require("cloudinary").v2
require("dotenv/config")
const { CloudinaryStorage } = require('multer-storage-cloudinary');


cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  
  

  const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req, file) => {
      const folder = 'upload';
  
      // Transformation for phone dimensions (e.g., 1080x1920)
      return {
        folder,
        format: 'jpg',
        transformation: [
          { width: 1080, height: 1920, crop: 'fill', gravity: 'auto' }, // Adjusted for phone resolution
          { quality: 'auto:eco', fetch_format: 'auto' }
        ],
      };
    },
  });
  
  const upload = multer({ storage: storage });
  



  // router.get('/:id', async (req, res) => {
  //   try {
  //     const { id } = req.params;
  //     if (!id || id === 'undefined') {
  //       return res.status(400).json({ success: false, message: 'Invalid product ID' });
  //     }
  //     const product = await Product.findById(id);
  //     if (!product) {
  //       return res.status(404).json({ success: false, message: 'Product not found' });
  //     }
  //     res.json(product);
  //   } catch (err) {
  //     res.status(500).json({ success: false, error: err.message });
  //   }
  // });
  


  router.get('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      if (!id || id === 'undefined') {
        return res.status(400).json({ success: false, message: 'Invalid product ID' });
      }
  
      // Fetch the main product
      const product = await Product.findById(id).populate('category', 'name');
      if (!product) {
        return res.status(404).json({ success: false, message: 'Product not found' });
      }
  
      // Fetch related products from the same category
      const relatedProducts = await Product.find({
        category: product.category._id,
        _id: { $ne: product._id }, // Exclude the current product
      }).limit(5); // Limit the number of related products
  
      res.json({ product, relatedProducts });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  });
  


// POST request to create a new product
router.post('/', upload.fields([
    { name: 'picture', maxCount: 1 },
    { name: 'picturesec', maxCount: 1 }
  ]), async (req, res) => {
  try {
    const {
      name,
      description,
      dimensions,
      camera,
      memory,
      battery,
      sim,
      resolution,
      category,
      ram,
      discount,
      sensor,
      price,
    } = req.body;

    const picture = req.files['picture'] ? req.files['picture'][0].path : null;
    const picturesec = req.files['picturesec'] ? req.files['picturesec'][0].path : null;



    // Create new product
    const newProduct = new Product({
      name,
      description,
      dimensions,
      resolution,
      memory,
      battery,
      sim,
      camera,
      category,
      ram,
      discount,
      price,
      sensor,
      picture: picture, 
      picturesec: picturesec,
    });

  
    const savedProduct = await newProduct.save();

    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET request to retrieve all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find().populate('category').sort({ dateCreated: -1 }); // Populate category name
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET request to retrieve a product by ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('category', 'name');
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT request to update a product by ID
router.put('/:id', async (req, res) => {
  try {
    const {
      name,
      description,
      dimensions,
      battery,
      sim,
      category,
      ram,
      discount,
      picture,
      picturesec,
      price,
      sensor,
      resolution,
      camera
    } = req.body;

    // Validate category if provided
    if (category) {
      const existingCategory = await Bestcate.findById(category);
      if (!existingCategory) {
        return res.status(400).json({ message: 'Invalid category ID' });
      }
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        name,
        description,
        dimensions,
        battery,
        sim,
        category,
        ram,
        discount,
        picture,
        picturesec,
        resolution,
        price,
        camera,
        sensor
      },
      { new: true } // Return the updated document
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
