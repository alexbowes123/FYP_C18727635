const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const { application } = require("express");
const {verifyToken} = require("./verifyToken");



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
        //encrypt user's password before storing in database
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

let refreshTokens = [];

router.post("/refresh", async (req,res)=>{
    //take the refresh token from user
    const refreshToken = req.body.token

    //send error if there is no token or invalid token
    if(!refreshToken){
        return res.status(401).json("You are not authenticated!");
    } 

    if(!refreshTokens.includes(refreshToken)){
        return res.status(403).json("Refresh token is not in array")
    }

    //if everything is ok, create new refresh and access tokens
    jwt.verify(refreshToken, process.env.JWT_REF, (err,user)=>{
        err && console.log(err);
        refreshTokens =refreshTokens.filter((token)=> token !== refreshToken);
        
    
        const newAccessToken = generateAccessToken(user); //is user reaching here?
        const newRefreshToken = generateRefreshToken(user);
      
        console.log("new access token with user passed is")
        console.log(newAccessToken);
        console.log("new refresh with user passed is");
        console.log(newRefreshToken);

        refreshTokens.push(newRefreshToken);

        //new refrsh and access are reaching react
        res.status(200).json({
            accessToken: newAccessToken,
            refreshToken: newRefreshToken
        });
    });

  
})



const generateAccessToken =(user)=>{
    return jwt.sign({
        id:user._id,
        isAdmin: user.isAdmin,
    },
    process.env.JWT_SEC,
    {expiresIn:"15s"}
    );
} 

const generateRefreshToken =(user)=>{
    return jwt.sign({
        id:user._id,
        isAdmin: user.isAdmin,
    },
    process.env.JWT_REF
    );
}

//LOGIN SECURELY
router.post("/login", async (req,res)=>{
    try{
        //find a user at with the passed email
        const user = await User.findOne({email: req.body.email});
        //if there is not a user
        if(!user){
            console.log("no user exists");
            return res.status(401).json("user does not exist");

        }


        //get encrypted password from db, decrypt it and compare it to the password passed in the request body

        const hashedPassword = CryptoJS.AES.decrypt(
            user.password,
            process.env.PASS_SEC
        );
        const OriginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
    
        if(OriginalPassword !== req.body.password){
            console.log("password wrong");
            return res.status(401).json("Wrong password");

        }  
        
        //when logging in successfully, make a 3 day token
        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);
        refreshTokens.push(refreshToken);

        const { password, ...others } = user._doc;


        console.log("new token being created at login");

        console.log(accessToken);

        res.status(200).json({...others, accessToken, refreshToken});
        console.log("user logged in!");
    } catch(err){
        console.log("potatoes");
        res.status(500).json(err);
    }
});

router.post("/logout", verifyToken, (req,res)=>{

    console.log("refToken is")
    const refreshToken = req.body.token;

    console.log(refreshToken);
    refreshTokens = refreshTokens.filter(token => token !== refreshToken);
    res.status(200).json("logged out successfully")
})

module.exports = router;


