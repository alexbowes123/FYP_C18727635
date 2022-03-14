const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const { rawListeners } = require("../models/User");

// REGISTRATION
router.post("/register", async (req,res)=>{

    const regEmail = await User.findOne({email: req.body.email});
    //check if an account has already been registered with the email
    if(regEmail){
        console.log("Email already registered!");
        return res.status(401).json("Email already registered!");

    }


    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString(),
    });
    try{
        const savedUser = await newUser.save();
        res.status(200).json(savedUser);
        console.log(savedUser);
    } catch (err) {
        res.status(500).json(err);
    } 
});
//LOGIN SECURELY
router.post("/login", async (req,res)=>{
    try{
        //find a user at with the passed email
        const user = await User.findOne({email: req.body.email});
        //if there is not a user
        // !user && res.status(401).json("Wrong user");
        if(!user){
            console.log("no user exists");
            return res.status(401).json("Wrong user");

        }


        const hashedPassword = CryptoJS.AES.decrypt(
            user.password,
            process.env.PASS_SEC
        );
        const OriginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
        
        // OriginalPassword !== req.body.password && res.status(401).json("Wrong password");
        if(OriginalPassword !== req.body.password){
            console.log("password wrong");
            return res.status(401).json("Wrong password");

        }  
        
        //when logging in successfully, make a 3 day token
        const accessToken = jwt.sign({
            id:user._id,
            isAdmin: user.isAdmin,
        },
        process.env.JWT_SEC,
        {expiresIn:"3d"}
        );

        const { password, ...others } = user._doc;


        console.log("new token being created at login");

        console.log(accessToken);

        res.status(200).json({...others, accessToken});
        console.log("user logged in!");
    } catch(err){
        console.log("potatoes");
        res.status(500).json(err);
    }
});

module.exports = router;


