const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/user");

dotenv.config();

mongoose.connect(
    process.env.MONGO_URL
)
.then(() => console.log("DBConnection successful!")).catch((err) => {
    console.log(err);
});

// To allow for JSON to be used
app.use(express.json());

app.get("/api/test", () =>{
    console.log("test is successful!");
})

//when going to a /user endpoint, this will bring to user.js
app.use("/api/users", userRoute);

app.listen(process.env.PORT || 5000, () => {
   console.log("Backend server running!") 
});