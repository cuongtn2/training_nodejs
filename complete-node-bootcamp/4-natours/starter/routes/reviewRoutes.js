const express = require('express');
const tourController = require('./../controllers/reviewController');
const authController = require('./../controllers/authController');
const router = express.Router();

router
  .route('/')
  .get(authController.protect, tourController.getAllReviews)
  .post(
    authController.protect,
    authController.restrictTo('user'),
    tourController.createReview
  );
router.route('/:id').get(authController.protect, tourController.getReview);

module.exports = router;
