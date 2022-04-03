const mongoose = require("mongoose")

const WishlistSchema = new mongoose.Schema(
    {
        userId: { type: String, required: true, unique: true },
        products: [
            {
                productId:{
                    type: String,
                },
                quantity: {
                    type: Number,
                    default: 1,
                },
                title: { type: String, required: true, unique: true },
                desc: { type: String, required: true},
                img: { type: String, required: true},
                categories: { type: Array },
                size: {type: Array},
                color: { type: String },
                price: { type: Number, required: true },
                img: { type: String, required: true},
                inStock: {type:Boolean, default: true},
            },
        ],
    },
    { timestamps: true }
);

module.exports = mongoose.model("Wishlist", WishlistSchema);