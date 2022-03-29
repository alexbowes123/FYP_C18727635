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

    // check if the productId in body is already in the cart
    // if so, update the quantity for that item
    // else add the new item to the products array in the cart

    try{
        console.log("userid is" + req.params.userId);
        const userID = req.params.userId;
        const prodId = req.body.products[0].productId; //only 1 product will be in products array in body

        let itemId;

        //get a cart that contains the current user's id + contains a product with the specified id 
       
        //get the user's whole cart
        const userCart = await Cart.findOne({ userId: userID })

        //check each item in cart, find the object id of the product if it exists in the cart

        for(var i = 0; i < userCart.products.length; i++) {
           
            //if the cart has a product with the same id as the product in the request body
            if (userCart.products[i].productId == prodId) {
                console.log("found a match with "+userCart.products[i].productId+" and " +prodId);
                //get the specific object id 
                console.log("id is" +userCart.products[i]._id);
                itemId = userCart.products[i]._id;


                //update the cart item's quantity with the object id

                try{
                    console.log("Updating quantity for item "+itemId);

                    const updatedQuantity = await Cart.findOneAndUpdate({
                        userId : req.params.userId
                        ,"products._id" : itemId },{
                            $inc : {"products.$.quantity" : 1, "cartTotal" : req.body.products[0].price}
                        }, 
                        {new:true}
                    );
                    res.status(200).json(updatedQuantity);

                }catch(error){
                    console.log(error);
                }

                // const aggreg = await Cart.aggregate(
                //     [
                //         {"$match" : { 
                //             "userId" : req.params.userId, 
                //             "products._id" : itemId,
                //             }
                //         }
                //         ,{"$sum" : { 
                //                 "products.$.itemTotal" : ["$products.$.price", "$products.$.quantity"]
                //             }
                            
                //         }
                //     ]
                // );

                // res.status(200).json(aggreg);
                return;
            }
        }

        //if the product id does not already exist in this cart
        console.log("adding new item to cart");
        
        const updatedCart = await Cart.findOneAndUpdate({
            userId: req.params.userId
        },{
            $push: req.body,//add the product to the cart's products array,
            $inc: {"cartTotal" : req.body.products[0].price}
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