const Order = require("../models/Order");
const {verifyTokenAndAdmin, verifyToken} = require("./verifyToken");

const router = require("express").Router();

//create a cart for a user 
router.post("/", async(req,res)=>{

    console.log("order body is")
    console.log(req.body);
    const newOrder = new Order(req.body);

    try{
        const savedOrder = await newOrder.save();
        res.status(200).json(savedOrder);
    } catch(error){
        console.log(error);
        res.status(500).json(error);
    }
});

router.put("/find/:userId", async (req,res)=>{
    console.log("in order put request!");

    console.log("adding new receipt to order");
    console.log("body received is",req.body);
    try{
        
        const updatedOrders = await Order.findOneAndUpdate({
            userId: req.params.userId
        },{
            $push: req.body//add the product to the cart's products array,
        },
        {new:true}
        );
        res.status(200).json(updatedOrders);

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get("/find/:userId", async(req,res)=>{
    try{
       
        const order = await Order.findOne({userId: req.params.userId});
        console.log("order  is " + order);
        res.status(200).json(order)
    } catch(error){
        res.status(500).json(error);
    }
});

module.exports = router;