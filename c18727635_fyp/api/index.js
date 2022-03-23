const express = require("express"); // used instead of standard node js
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv"); // refernces .env file which stores info that will not be uploaded: JWT and passwrds
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const cookieParser = require("cookie-parser");

const cors = require('cors'); // resolves cross origin issues
//use cors to help allow for cross-origin reading
app.use(cors());


dotenv.config();

//mongo db connection
mongoose.connect(
    process.env.MONGO_URL
)
.then(() => console.log("DBConnection successful!")).catch((err) => {
    console.log(err);
});



// To allow for JSON to be used
app.use(express.json());


//cookie parser
app.use(cookieParser());

//when this path is added to url, access routes from corresponding file
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/products", productRoute);
app.use("/api/cart", cartRoute);

//CORS - accept requests from all urls
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
  });



const PORT = process.env.PORT || 5000;

app.listen(PORT , () => {
   console.log("Backend server running!");
//    console.log(`listening on ${process.env.PORT}`);
});

