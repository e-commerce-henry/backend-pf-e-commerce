const { Router } = require('express');
const router = Router()


const { getReview } = require('../controllers/Review/GetReview');
const { postReview } = require('../controllers/Review/PostReview');

router.get('/:id/review', getReview);
router.post('/:id/review', postReview);


module.exports= router