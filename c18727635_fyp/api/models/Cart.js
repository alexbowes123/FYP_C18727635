const mongoose = require("mongoose")

const CartSchema = new mongoose.Schema(
    {
        userId: { type: String, required: true, unique: true },
        products: [
            {
                productId:{type: String },
                quantity: {type: Number,default: 1 },
                title: { type: String, required: true, unique: true },
                desc: { type: String, required: true},
                img: { type: String, required: true},
                categories: { type: Array },
                size: {type: Array},
                color: { type: String },
                price: { type: Number, required: true },
                img: { type: String, required: true}
            },
        ],
        cartTotal: {type: Number, default: 0}
    },
    { timestamps: true }
);

module.exports = mongoose.model("Cart", CartSchema);