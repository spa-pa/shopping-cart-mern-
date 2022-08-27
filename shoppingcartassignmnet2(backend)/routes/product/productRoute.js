var express = require('express');
var router = express.Router();
var Products= require("../../configuration/database/model").Products
var Orders= require("../../configuration/database/model").Orders
const headerAuthorization=require('../../middlewares/middleware').headerAuthorization


//----------Get all products list----------
router.get("/products",async (req, res) => {
    
    const products = await Products.find({});
    

    res.send(products);
});


//----------Create oredr----------
router.post("/orders",headerAuthorization,async(req,res)=>{
    
        try{
            
          const data =  { 
                "useremail":req.usertoken.email,
                "address": req.body.address,
                "total": req.body.total,
                "cartItems": req.body.cartItems,
                "date":new Date().toLocaleString()
               
            }
            

      const order=await Orders(data).save()
      res.send(order)
        }catch(e){
            console.log("error "+JSON.stringify(e))
            res.send(JSON.stringify(e))
        }
})

module.exports = router;