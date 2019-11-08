const router = require('express').Router();
const reviewModel = require('../models/review');
const authMiddleware = require('../routes/middleware/auth');

router.use(authMiddleware);
router.get(["/", "/all"], async (req, res, next) => {

    try {
        const result = await reviewModel.find({
            isDeleted: false
        }).populate('typeId').exec();
        return res.json(result);
    } catch (err) {
        return next(err);
    }

});


/**
 * Get Review by Id
 */
router.get("/:id", async (req, res, next) => {
    var reviewId = req.params.id;

    try {
        const result = await reviewModel.find({
            _id: reviewId,
            isDeleted: false
        }).populate('typeId').exec();
        res.json(result[0]);
    } catch (err) {
        return next(err);
    }
});

/**
 * Create Review
 */
router.post("/create", async (req, res, next) => {
    var reqBody = req.body;


    var newReview = new reviewModel({
        title: reqBody.title,
        body: reqBody.body,
        typeId: reqBody.typeId,
        type: reqBody.type
    });

    try {
        const result = await newReview.save();
        return res.json(result);
    } catch (err) {
        return next(err);
    }
});

router.put("/:id", async (req, res, next) => {
    var reviewId = req.params.id;

    var reqBody = req.body;

    var newReview = {};
    if (reqBody.title != null) {
        newReview.title = reqBody.title;
    }
    if (reqBody.body != null) {
        newReview.body = reqBody.body;
    }


    try {

        const result = await reviewModel.updateOne({
            _id: reviewId
        }, newReview).exec();
        return res.json(result);
    } catch (err) {
        return next(err);
    }




});
router.delete("/:id", async (req, res, next) => {
    var reviewId = req.params.id;

    try {
        const result = await reviewModel.updateOne({
            _id: reviewId
        }, {
            isDeleted: true
        }).exec();
        return res.json(result);
    } catch (err) {
        return next(err);
    }

});



module.exports = router;