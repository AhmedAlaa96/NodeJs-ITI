const router = require('express').Router();
const userModel = require('../models/user');
const postModel = require('../models/post');
const md5 = require('md5');
const jwt = require('jsonwebtoken');

router.post("/signin",async (req,res,next)=>{
    var reqBody = req.body;
   
    const hashPassword = md5(reqBody.password);
    try {
        const doc = await userModal.find({username:req.body.username ,password:hashPassword}).exec();
        const signedtoken = jwt.sign(doc.toJSON(),process.env.secret,{expiresIn:'1d'});
        const updateddoc = await userModal.findOne({username:doc.username,password:hashedPass}).update({token:signedtoken});
        res.cookie('token',signedtoken,{sameSite:true,signed:true});
        return res.json(doc);
    } catch (err) {
        return res.status(403).send(err);
    }
});

/**
 * Get all Userss
 */
router.get(["/", "/all"], async (req, res, next) => {

    try {


        const result = await userModel.find({
            isDeleted: false
        }).exec();

        return res.json(result);
    } catch (err) {
        return next(err);
    }


});


/**
 * Get User by Id
 */
router.get("/:id", async (req, res, next) => {
    var userId = req.params.id;

    try {
        const result = await userModel.find({
            _id: userId,
            isDeleted: false
        }).exec();
        return res.json(result[0]);
    } catch (err) {
        return next(err);
    }


});

/**
 * Create User
 */
router.post("/create", async (req, res, next) => {
    var reqBody = req.body;
    var hashPassword = md5(reqBody.password);
    

    var newUser = new userModel({
        name: reqBody.name,
        username: reqBody.username,
        password: hashPassword,
        age: reqBody.age,
        phone: reqBody.phone
    });
   
   
    try {
        const result = await newUser.save();
        console.log(result);
        
        return res.json(result);
    } catch (err) {
        next(err);
    }
});


router.put("/:id", async (req, res, next) => {
    var userId = req.params.id;


    var reqBody = req.body;

    var newUser = {};
    if (reqBody.name != null) {
        newUser.name = reqBody.name;
    }
    if (reqBody.password != null) {
        newUser.password = reqBody.password;
    }
    if (reqBody.phone != null) {
        newUser.phone = reqBody.phone;
    }
    if (reqBody.age != null) {
        newUser.age = reqBody.age;
    }

    try {
        const result = await userModel.updateOne({
            _id: userId
        }, newUser).exec();
        return res.json(result);
    } catch (err) {
        return next(err);
    }


});
router.delete("/:id", async (req, res, next) => {
    var userId = req.params.id;
    try {
        const result = await postModel.updateMany({
            userId: userId
        }, {
            isDeleted: true
        }).exec();
        return next();
    } catch (err) {
        return next(err);
    }
});
router.delete("/:id", async (req, res, next) => {
    var userId = req.params.id;
    try {
        const result = await userModel.updateOne({
            _id: userId
        }, {
            isDeleted: true
        }).exec();
        return res.json(result);
    } catch (err) {
        return next(err);
    }

});



router.get('/:id/posts', (req, res, next) => {

    var userId = req.params.id;

    postModel.find({
        userId: userId,
        isDeleted: false
    }).populate('userId').exec((err, data) => {
        if (err) return next(err);
        return res.json(data);
    });
});
/**
 * ).populate('userId',
 */


router.use((err, req, res, next) => {
    res.status(500).send(err);
});




module.exports = router;