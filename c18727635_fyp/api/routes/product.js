//Use product model
const Product = require("../models/Product");
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin} = require("./verifyToken");

const router = require("express").Router();

//create
// ONLY AN ADMIN CAN CREATE A NEW PRODUCT
router.post("/", verifyTokenAndAdmin, async (req, res)=>{
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

// // Get all products
router.get("/", async (req, res) => {
    const qNew = req.query.new  // get newest 
    const qCategory = req.query.category // get in a certain category
    try {
        let products;

        if(qNew){
            products = await Product.find().sort({ createdAt: -1}).limit(1);
        } else if(qCategory){
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

// //Get user stats
// //Get how many users were made in each month (1 = jan, 2 = feb)
// router.get("/stats", verifyTokenAndAdmin, async (req, res)=>{
//     const date = new Date();
//     const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

//     try{

//         const data = await User.aggregate([
//             {$match: {createdAt: {$gte: lastYear}}},
//             {
//                 $project:{
//                     month: { $month: "$createdAt" }
//                 },
//             },
//             {
//                 $group:{
//                     _id: "$month",
//                     total:{$sum: 1},
//                 }
//             }
//         ]);
//         res.status(200).json(data);
//     }catch(error) {
//         res.status(500).json(err);
//     }
// })
module.exports = router