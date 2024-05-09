const mongoose = require('mongoose');
const ordersProducts = mongoose.Schema({
    orderId:{type:mongoose.Types.ObjectId, refer: 'orders'},
    productId:{type:mongoose.Types.ObjectId, refer: 'products'},
    quantity:{type:Number, require: true},
})

module.exports = mongoose.model('ordersProducts', ordersProducts);