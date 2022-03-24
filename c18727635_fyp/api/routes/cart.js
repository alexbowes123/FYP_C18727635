//use Cart model

const Cart = require("../models/Cart");
const {verifyTokenAndAdmin, verifyToken} = require("./verifyToken");

const router = require("express").Router();

//create a cart for a user 
router.post("/", async(req,res)=>{

    console.log("cart body is")
    console.log(req.body);
    const newCart = new Cart(req.body);

    try{
        const savedCart = await newCart.save();
        res.status(200).json(savedCart);
    } catch(error){
        console.log(error);
        res.status(500).json(error);
    }
});

router.put("/find/:userId", async (req,res)=>{
    console.log("in put request!");

    try{
        console.log("updating cart for user "+req.params.userId);
        
        updatedCart = await Cart.findOneAndUpdate({
            userId: req.params.userId
        },{
            $push: req.body
        },
        {new:true}
    );
    res.status(200).json(updatedCart);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

//get a cart for a specific user
router.get("/find/:userId", async(req,res)=>{
    try{
        console.log("userid is" + req.params.userId);
        const cart = await Cart.findOne({userId: req.params.userId});
        console.log("cart  is " + cart);
        res.status(200).json(cart)
    } catch(error){
        res.status(500).json(error);
    }
})

//get all carts
router.get("/", async (req, res) => {
    const qUser = req.query._id  // get newest 
    try {
        let carts;

        if(qUser){
            carts = await Cart.find().sort({ createdAt: -1}).limit(1);
        } 
        else {
            // else if no query then get all products from db
            carts = await Cart.find();
        }
      
    
        res.status(200).json(carts)
    } catch (error){
        res.status(500).json(error);
    }
    
});

module.exports = router;