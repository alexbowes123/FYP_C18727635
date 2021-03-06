//Use product model
const Product = require("../models/Product");
const { verifyTokenAndAdmin } = require("./verifyToken");

const router = require("express").Router();

//create
// ONLY AN ADMIN ACCOUNT CAN CREATE A NEW PRODUCT
router.post("/", verifyTokenAndAdmin, async (req, res)=>{
    
    //get product from request body
    const newProduct = new Product(req.body);
    
    try{
        const savedProduct = await newProduct.save();
        res.status(200).json(savedProduct);
    } catch(error){
        res.status(500).json(error); 
    }

});


//UPDATE A PRODUCT

router.put("/:id", verifyTokenAndAdmin, async (req,res)=>{
    try{
        //find existing product document by id paramter, update it with request body
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, {
            $set: req.body
        },
        {new:true}
    );
    res.status(200).json(updatedProduct);
    } catch (err) {
        res.status(500).json(err);
    }
});

//DELETE A PRODUCT

router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id)
        res.status(200).json("Deleted product")
    } catch (error){
        res.status(500).json(error);
    }
});

// //GET Product
router.get("/find/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        res.status(200).json(product)
    } catch (error){
        res.status(500).json(error);
    }
    
});

// // Get products by catergory parameter in url
router.get("/:category",  async (req, res) => {
    console.log("user in request is");
    console.log(req.user);
 
    const qCategory = req.params.category // get in a certain category
    try {
        let products;

       if(qCategory){
            products = await Product.find({
                categories:{
                    $in:[qCategory],
                },
            });
        } else {
            // else if no query then get all products from db
            products = await Product.find();
        }
      
    
        res.status(200).json(products)
    } catch (error){
        res.status(500).json(error);
    }
    
});

module.exports = router