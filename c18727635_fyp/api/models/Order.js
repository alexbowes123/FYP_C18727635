const mongoose = require("mongoose")

const OrderSchema = new mongoose.Schema(
    {
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
            },
        ],
        cartTotal: {type: Number, default: 0},
        amount: { type: Number, required: true},
        address: { type: Object, required: true},
        status: { type: String, default: "Pending"}
    },
    { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);