//---------Middleware use to authenticate api----------

//-----------Use different externel module-----------
var jwt = require('jsonwebtoken');


//----------Use different  internal module----------
var logger = require('../configuration/logger/logger').logger

//----------Chec Body Parameter Notnull----------
function checkNullBodyParam(req, res, next) {
    try {
        logger.info('Middleware :: checkNullBodyParam start')
        var collectkey = []

        //Seperate the keys and check null and push
        Object.keys(req.body).forEach(a => {

            //check condition
            if (req.body[a] == null || req.body[a] == undefined || req.body[a] == " "|| req.body[a] == "") {

                collectkey.push(a)
            }

        })
        
        if (collectkey.length === 0) {
            next()
        }
        else {
            res.status(500).json({ status: "Content should not be null,undefiend or blank" });
        }


    }
    catch (error) {
       
        logger.error('Middleware :: checkNullBodyParam .Catch Error :' + error)
        res.status(500).json({ status: error });
    }
}

//----------Check Jwt-----------
function headerAuthorization(req,res,next){
    try{
        logger.info('Middleware  :: headerAuthorization start')
        var token=req.headers.authorization     //We get token from headers.authorization
        var decode= jwt.verify(token, 'secret');    //verifies the token & secret key
        req.usertoken=decode; 
      
        next();


    }catch(err){
        logger.error('Middleare  ::  headerAuthorization catch error : '+err)
        res.status(500).json({status :err})
    }

}

//--------Check its admin req----------
function headerAuthorizationforAdmin(req,res,next){
    try{
        logger.info('Middleware  :: headerAuthorization start')
        var token=req.headers.authorization     //We get token from headers.authorization
        if(token == "39fce1714657bd413297c7406337ca73769c86c80f4e52320bd9a8ec5aab6b80")   
        next();
        else {
            res.status(500).json({ status: "Restrict" });
        }

    }catch(err){
        logger.error('Middleare  ::  headerAuthorization catch error : '+err)
        res.status(500).json({status :err})
    }

}

module.exports = {
    checkNullBodyParam,
    headerAuthorization
}