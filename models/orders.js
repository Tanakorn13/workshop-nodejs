const mongoose = require('mongoose')
const orders = new mongoose.Schema({
    product_name: {type: String, },
    amount:{type: Number, required: true},
    user:{type:mongoose.Schema.Types.ObjectId, ref:'user'},
    productId:{type:mongoose.Schema.Types.ObjectId, ref:"products"},
})

module.exports = mongoose.model('orders', orders);