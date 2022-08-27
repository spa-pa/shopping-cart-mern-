//----------User profie user----------

//Use different modules
var express = require('express');
var router = express.Router();


//----------Use different  internal fuctionality----------
var logger = require('../../configuration/logger/logger').logger
const usersService = require('../../services/usersServices')
const commonService = require('../../services/commonServices')
const checkNullBodyParam=require('../../middlewares/middleware').checkNullBodyParam
const headerAuthorization=require('../../middlewares/middleware').headerAuthorization




//----------Login user----------
router.post('/signin',checkNullBodyParam, async function (req, res, next) {
  console.log("req.body "+JSON.stringify(req.body))
  logger.info('Routes :: users signin start : ' + JSON.stringify(req.body))
  try {

    //Check credential
    var loginResponce = await usersService.userLogin(req.body)

    
if(loginResponce=="Not register" || loginResponce==null){
  res.status(200).json({ loginResponce:"User Not Register" });

}else{
  //Create validator
  var validatorResponce = await commonService.createValidator(req.body.email)
    res.status(200).json({ loginResponce:loginResponce, validator: validatorResponce });
}
  } catch (err) {
console.log(JSON.stringify(err))
    logger.error('Routes :: users signin catch error : ' + err)
    res.status(500).send({ error: err });

  }
});


//----------Registration user----------
router.post('/signup',checkNullBodyParam,async function (req, res, next) {
  logger.info('Routes :: users signup start : ' + JSON.stringify(req.body))
  try {
    //Register all details of user
    await usersService.userRegister(req.body)
    res.status(200).json({ status: "Successfully registered" });
  } catch (err) {

    logger.error('Routes :: users signup catch error : ' + err)
    res.status(500).json({ status: err });

  }
});


module.exports = router;
