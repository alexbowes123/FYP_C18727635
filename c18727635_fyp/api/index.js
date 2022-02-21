const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const cors = require('cors');


//use cors to help allow for cross-origin reading
app.use(cors());




dotenv.config();

mongoose.connect(
    process.env.MONGO_URL
)
.then(() => console.log("DBConnection successful!")).catch((err) => {
    console.log(err);
});



app.get("/api/test", () =>{
    console.log("test is successful!");
})

// To allow for JSON to be used
app.use(express.json());

//when going to a /user endpoint, this will bring to user.js
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/products", productRoute);

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
  });


// const corsOptions ={
//     origin:'http://localhost:3000', 
//     credentials:true,            //access-control-allow-credentials:true
//     optionSuccessStatus:200
// }
// app.use(cors(corsOptions));



const PORT = process.env.PORT || 5000;

app.listen(PORT , () => {
   console.log("Backend server running!");
//    console.log(`listening on ${process.env.PORT}`);
});

