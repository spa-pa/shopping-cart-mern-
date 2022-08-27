//----------User profie use-------------

//-----------Use different  internal fuctionality----------
var logger = require('../configuration/logger/logger').logger
const commonService = require('../services/commonServices')
var Users = require("../configuration/database/model").Users



//----------Function check user present in database----------
async function userLogin(data) {
    console.log("data "+JSON.stringify(data))
    logger.info('Service :: userServices userLogin start ')
    return new Promise(function (resolve, reject) {
        try {
        

            Users.findOne({
                "email": data.email,"password":data.password
              }, function (err, userres) {
                  if (err)
                      return resolve(err);
                      console.log("userres "+JSON.stringify(userres))
                      resolve(userres);
              })

            

        } catch (err) {

            logger.error('Service :: userServices userLogin  catch error : ' + err)
            reject(err);

        }

    })
}

//----------Function insert credential in database----------
async function userRegister(data) {
    logger.info('Service :: userServices userRegister start ')
    return new Promise(async function (resolve, reject) {
        try {
            var user = new Users(data);

            user.save(function (err) {
                if (err)
                    return resolve(e);

                Users.find(function (err, userres) {
                    if (err)
                        return resolve(err);
                    resolve("success");
                });
            });


        } catch (err) {

            logger.error('Service :: userServices userRegister  catch error : ' + err)
            reject(err);

        }

    })
}



module.exports = {
    userLogin,
    userRegister
}