//----------DatabaseSchemas----------

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

//----------Product schema----------
var productSchema = new Schema({


    "_id": String,
    "image": String,
    "title": String,
    "description": String,
    "availableSizes": Array,
    "price": Number

});

//----------Oredr schema ----------
var oredrSchema = new Schema({ 
    "useremail":String,
    "address": String,
    "total": Number,
    "cartItems": [{
        "_id": String,
        "title": String,
        "price": Number,
        "count": Number,
        
    }],
    "date":String
   
}
);
//----------User schema----------
var userSchema = new Schema({

   "email":String,
   "password":String

});
module.exports={
    productSchema,
    oredrSchema,
    userSchema
}
