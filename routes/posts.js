const router = require('express').Router();
const postModel = require('../models/post');
const authMiddleware = require('../routes/middleware/auth');

router.use(authMiddleware);
router.get(["/", "/all"], async (req, res, next) => {

    try {
        const result = await postModel.find({
            isDeleted: false
        }).exec();
        return res.json(result);
    } catch (err) {
        next(err);
    }



});


/**
 * Get User by Id
 */
router.get("/:id", async (req, res, next) => {
    var postId = req.params.id;

    try {
        const result = await postModel.find({
            _id: postId,
            isDeleted: false
        }).exec();
        return res.json(result[0]);
    } catch (err) {
        return next(err);
    }
});

/**
 * Create post
 */
router.post("/create", async (req, res, next) => {
    var reqBody = req.body;


    var newPost = new postModel({
        title: reqBody.title,
        body: reqBody.body,
        userId: reqBody.userId
    });
    try {

        const result = await newPost.save();
        return res.json(result);
    } catch (err) {
        next(err);
    }
});

router.put("/:id", async (req, res, next) => {
    var postId = req.params.id;

    var reqBody = req.body;

    var newPost = {};
    if (reqBody.title != null) {
        newPost.title = reqBody.title;
    }
    if (reqBody.body != null) {
        newPost.body = reqBody.body;
    }
    try {
        const result = await postModel.updateOne({
            _id: postId
        }, newPost);
        return res.json(result);
    } catch (err) {
        return next(err);
    }

});
router.delete("/:id", async (req, res, next) => {
    var postId = req.params.id;
    try {
        const result = await postModel.updateMany({
            _id: postId
        }, {
            isDeleted: true
        }).exec();
        return res.json(result);
    } catch (err) {
        next(err);
    }

});



module.exports = router;