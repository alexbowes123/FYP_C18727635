const mongoose = require("mongoose")

const OrderListSchema = new mongoose.Schema(
    {
        userId: { type: String, required: true, unique: true },
        receipts: [
            {
                receiptId:{
                    type: String,
                },
                orderDate: {
                    type: String
                },
                payerName:{
                    type: String
                },
                payerEmail:{
                    type:String
                },
                purchaseCurrency:{
                    type:String
                },
                purchaseAmount:{
                    type: Number
                },
                orderStatus:{
                    type: String
                }
            },
        ],
    },
    { timestamps: true }
);

module.exports = mongoose.model("OrderList", OrderListSchema);