const Wishlist = require("../models/Wishlist");

const router = require("express").Router();

//create a wishlist  for a new user 
router.post("/", async(req,res)=>{

    console.log("creating a wishlist using",req.body);

    const newWishlist = new Wishlist(req.body);

    try{
        const savedWishlist = await newWishlist.save();
        res.status(200).json(savedWishlist);
    } catch(error){
        console.log(error);
        res.status(500).json(error);
    }
});

router.put("/find/:userId", async (req,res)=>{
    console.log("in put request!");

    // check if the productId in body is already in the wishlist
    // if so, update the quantity for that item
    // else add the new item to the products array in the wishlist

    try{
        console.log("userid is" + req.params.userId);
        const userID = req.params.userId;
        const prodId = req.body.products[0].productId; //only 1 product will be in products array in body

        let itemId;

        //get a wishlist that contains the current user's id + contains a product with the specified id 
       
        //get the user's whole wishlist
        const userWishlist = await Wishlist.findOne({ userId: userID })

        //check each item in wishlist, find the object id of the product if it exists in the wishlist

        for(var i = 0; i < userWishlist.products.length; i++) {
           
            //if the wishlist has a product with the same id as the product in the request body
            if (userWishlist.products[i].productId == prodId) {
                console.log("found a match with "+userWishlist.products[i].productId+" and " +prodId);
                //get the specific object id 

                alert("item already in wishlist");
               
                return;
            }
        }

        //if the product id does not already exist in this wishlist
        console.log("adding new item to wishlist");
        
        const updatedWishlist = await Wishlist.findOneAndUpdate({
            userId: req.params.userId
        },{
            $push: req.body,//add the product to the wishlist's products array,
        },
        {new:true}
        );
        res.status(200).json(updatedWishlist);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get("/find/:userId", async(req,res)=>{
    try{
        const wishlist = await Wishlist.findOne({userId: req.params.userId});
        console.log("wishlist  is " + wishlist);
        res.status(200).json(wishlist)
    } catch(error){
        res.status(500).json(error);
    }
})











router.put("/deduct/:userId", async (req,res)=>{
   
    // check if the productId in body is already in the wishlist
    // if so, tell the user the item is already in the wishlist
    // else add the new item to the products array in the wishlist

    try{
   
        const userID = req.params.userId;
        const prodId = req.body.products[0].productId; //only 1 product will be in products array in body

        let itemId;

        //get a wishlist that contains the current user's id + contains a product with the specified id 
       
        //get the user's whole wishlist
        const userWishlist = await Wishlist.findOne({ userId: userID });

        //check each item in wishlits, find the object id of the product if it exists in the wishlist

        for(var i = 0; i < userWishlist.products.length; i++) {
           
            //if the wishlist has a product with the same id as the product in the request body
            if (userWishlist.products[i].productId == prodId) {

                console.log("found a match with "+userWishlist.products[i].productId+" and " +prodId);
                //get the specific object id 

                // console.log("id is" +userWishlist.products[i]._id);
                itemId = userWishlist.products[i]._id;
    
                try{
                    
                    console.log("removing item from wishlist");
                    const removeItem = await Wishlist.findOneAndUpdate(
                        {
                            "userId" : req.params.userId
                        },
                        {
                            "$pull":{"products":{'_id': itemId}},
                        }
                    );
                        
                    console.log("deletion from wishlist");
                    res.status(200).json(removeItem);
                    return;

                }catch(error){
                    console.log(error);
                }


            }
               
        }
        
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});


module.exports = router;