//----------All Admin Routes ----------

var express = require('express');
var router = express.Router();
var Products = require("../../configuration/database/model").Products
var Orders = require("../../configuration/database/model").Orders
const ObjectId = require("mongodb").ObjectId;


router.get("/", async (req, res) => {
     res.render('index', { message: " " });
});

//----------All Product List----------
router.get("/products", async (req, res) => {
     const products = await Products.find({});
     res.render('LayoutComponent/main', { productList: products });

});

//----------Delete Product ----------
router.get("/deleteProduct", async (req, res) => {
     var id = String(req.query.id)
     var productId = JSON.parse(id)

     Products.deleteOne({
          _id: productId
     }, async function (err, prores) {

          const products = await Products.find({});
          res.render('LayoutComponent/main', { productList: products });
     });

});
//----------Edit Product Route----------
router.get("/EditProductPage", async (req, res) => {
     var id = String(req.query.id)
     const products = await Products.find({ _id: id });
     console.log(JSON.stringify(products))
     res.render('ActionComponent/editProduct', { message: "", title: products[0].title, description: products[0].description, price: products[0].price, id: products[0]._id });
})
//----------Edit Product ----------
router.post("/editProduct", async (req, res) => {
    
     Products.findOne({
          _id: req.body.id
     }, async function (error, prores) {
          if (error)
               return res.send(error);

          for (prop in req.body) {
               prores[prop] = req.body[prop];
          }
          prores.save(async function (err, result) {
               const products = await Products.find({});

               res.render('LayoutComponent/main', { productList: products });

          });
     });
})
//----------Add Product Route----------
router.get("/addProductPage", async (req, res) => {
     res.render('ActionComponent/addProducts', { message: "" });
})
//----------Add Product ----------
router.post("/addproduct", async (req, res) => {
     var splitData = req.body.availableSizes
     const data = {
          "_id": Math.random(),
          "image": "/images/dress1.jpg",
          "title": req.body.title,
          "description": req.body.description,
          "availableSizes": splitData.split(","),
          "price": Number(req.body.price)
     }
     var product = new Products(data);

     product.save(async function (err) {
          if (err) {
               res.render('ActionComponent/addProducts', { message: err });
          }
          else {
               const products = await Products.find({});

               res.render('LayoutComponent/main', { productList: products });

          }

     });
});
//----------Orders counts  Route----------
router.get("/ordersPage", async (req, res) => {

     const orderList = await Orders.find({}, { useremail: 1, _id: 0 })
     // console.log(JSON.stringify(orderList))
     var newO = []
     orderList.forEach(list => {
          newO.push(list.useremail)
     })

     let counts = {};
     let keys = []
     newO.forEach((x) => {
          keys.push(x)
          console.log("xx " + x)
          counts[x] = (counts[x] || 0) + 1;
     });
     let uniqueChars = [...new Set(keys)];
     let final = []
     uniqueChars.forEach(list => {
          final.push({ name: list, count: counts[list] })
     })

     res.render('ActionComponent/orderList', {
          orderCustomer: final
     });


});
//----------Order Route----------
router.get("/orders", async (req, res) => {
     // console.log(req.query.email)
     var email = String(req.query.email)
     const orders = await Orders.find({ useremail: email });
     console.log(JSON.stringify(orders))
     res.render('ActionComponent/singleUserOrder', { ordersList: orders });



});

//----------Delete Order Route----------
router.get("/deleteOrder", async (req, res) => {
     Orders.deleteOne({
          _id: ObjectId(req.query.id)
     }, async function (err, orderes) {
          const orders = await Orders.find({ useremail: req.query.email });
 
          if (orders.length == 0) {
               const orderList = await Orders.find({}, { useremail: 1, _id: 0 })
               // console.log(JSON.stringify(orderList))
               var newO = []
               orderList.forEach(list => {
                    newO.push(list.useremail)
               })

               let counts = {};
               let keys = []
               newO.forEach((x) => {
                    keys.push(x)
                    console.log("xx " + x)
                    counts[x] = (counts[x] || 0) + 1;
               });
               let uniqueChars = [...new Set(keys)];
               let final = []
               uniqueChars.forEach(list => {
                    final.push({ name: list, count: counts[list] })
               })

               res.render('ActionComponent/orderList', {
                    orderCustomer: final
               });

          }
          else {
               res.render('ActionComponent/singleUserOrder', { ordersList: orders });

          }



     });



});
//----------Dashbord route----------
router.post("/dashbord", async (req, res) => {

     if (req.body.email == "sandesh11@gmail.com" && req.body.password == "12345") {
          const products = await Products.find({});

          res.render('LayoutComponent/main', { productList: products });

     }
     else {
          res.render('index', { message: "Invalid credentials" });
     }

});

module.exports = router;