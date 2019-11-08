const usermodal = require('../../models/user');
const jwt = require("jsonwebtoken");

module.exports = async function(req,res,next){
    if(req.signedCookies.token){
        try{
        jwt.verify(req.signedCookies.token,process.env.secret);
        const doc = await usermodal.findOne({token:req.signedCookies.token}).exec();
        if(doc)
        next();
        else{
            next("invalid token for the given user");
        }
         }
         catch(e){
            res.status(422).json({state:"token expired sign in again"});
         }
    }
    else{
        res.status(422).json({state:"use /users/signin route to create token first"});
    }
};