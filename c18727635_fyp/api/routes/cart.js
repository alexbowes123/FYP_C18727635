//use Cart model

const Cart = require("../models/Cart");
const {verifyTokenAndAdmin, verifyToken} = require("./verifyToken");

const router = require("express").Router();

//create a cart for a user 
router.post("/", async(req,res)=>{
    const newCart = new Cart(req.body);

    try{
        const savedCart = await newCart.save();
        res.status(200).json(savedCart);
    } catch(error){
        res.status(500).json(error);
    }
});

//get a cart for a specific user
router.get("/find/:userid", async(req,res)=>{
    try{
        const user = req.params.userid;
        console.log("user id is " + user);
    } catch(error){
        res.status(500).json(error);
    }
})

module.exports = router;