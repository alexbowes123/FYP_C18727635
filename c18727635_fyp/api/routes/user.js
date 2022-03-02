const User = require("../models/User");
const {verifyTokenAndAuthorization, verifyTokenAndAdmin} = require("./verifyToken");

//router used for performing requests
const router = require("express").Router();


router.put("/:id", verifyTokenAndAuthorization, async (req,res)=>{
    if(req.body.password) {
        req.body.password = CryptoJS.AES.decrypt(
            req.body.password,
            process.env.PASS_SEC
        ).toString();
    }
    try{
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set: req.body
        },
        {new:true}
    );
    res.status(200).json(updatedUser);
    } catch (err) {
        res.status(500).json(err);
    }
});


router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id)
        res.status(200).json("Deleted user")
    } catch (error){
        res.status(500).json(error);
    }
});

//GET USER
router.get("/find/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        const { password, ...others } = user._doc;

        res.status(200).json(others)
    } catch (error){
        res.status(500).json(error);
    }
    
});

// Get every user
router.get("/", verifyTokenAndAdmin, async (req, res) => {
    const query = req.query.new
    try {
        // if there is a query = new, return 5 latests users. if not, return all users
        // sort by id descending
        const users = query ? await User.find().sort({_id:-1}).limit(5) : await User.find()
        res.status(200).json(users)
    } catch (error){
        res.status(500).json(error);
    }
    
});

//Get user stats
//Get how many users were made in each month (1 = jan, 2 = feb)
router.get("/stats", verifyTokenAndAdmin, async (req, res)=>{
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

    try{

        const data = await User.aggregate([
            {$match: {createdAt: {$gte: lastYear}}},
            {
                $project:{
                    month: { $month: "$createdAt" }
                },
            },
            {
                $group:{
                    _id: "$month",
                    total:{$sum: 1},
                }
            }
        ]);
        res.status(200).json(data);
    }catch(error) {
        res.status(500).json(err);
    }
})
module.exports = router