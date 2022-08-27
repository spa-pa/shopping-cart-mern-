

//----------Database model----------
var productSchema=require("./schema").productSchema
var oredrSchema=require("./schema").oredrSchema
var userSchema=require("./schema").userSchema
var mongoose = require("mongoose");




const Products = mongoose.model('products', productSchema);
const Orders = mongoose.model('orders', oredrSchema);
const Users = mongoose.model('users', userSchema);

module.exports={
    Products,
    Orders,
    Users
}
