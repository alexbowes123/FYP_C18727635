const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next)=>{
    const headerToken = req.headers.token //token is being sent in the header 
    if(headerToken){

            //split token header since it is in format "Bearer SDFSFFD..." to get the token without the bearer word
            const splitToken = headerToken.split(" ")[1];

        jwt.verify(splitToken, process.env.JWT_SEC, (err, user)=>{
            if(err)
            {
                return res.status(403).json("Token is not valid");
            }
            else
            {
                //If token is valid, retrieve user and continue with the request.
                req.user = user;
                next();

            }
        });
    } else {
        return res.status(401).json("Invalid Token");
    }
};

const verifyTokenAndAuthorization = (req,res,next)=>{
    verifyToken(req,res,()=>{
        if(req.user.id === req.params.id || req.user.isAdmin){
            next()
        } else {
            res.status(403).json("You are not allowed to do that");
        }
    });
};

// check that a token belongs to an admin user
// This is used for adding new products to monogdb.
//Tokens added by logging in with an admin account in postman, then 
//make a post request to add a product which performs the verification below:
const verifyTokenAndAdmin = (req,res,next)=>{
    verifyToken(req,res,()=>{
        if(req.user.isAdmin){
            next()
        } else {
            res.status(403).json("You are not allowed to do that");
        }
    });
};

module.exports = { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin };