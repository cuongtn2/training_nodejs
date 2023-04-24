const express = require('express');
const tourController = require('./../controllers/reviewController');
const reviewController = require('./../controllers/reviewController');
const authController = require('./../controllers/authController');
const router = express.Router({ mergeParams: true });

//post /tour/:idtour/reviews
//post /tour/1234/reviews
router.use(authController.protect);

router
  .route('/')
  .get(authController.protect, tourController.getAllReviews)
  .post(
    authController.restrictTo('user'),
    reviewController.setTourUserIds,
    tourController.createReview
  );
router
  .route('/:id')
  .get(authController.protect, tourController.getReview)
  .delete(
    authController.restrictTo('user', 'admin'),
    reviewController.deleteReview
  )
  .patch(
    authController.restrictTo('user', 'admin'),
    reviewController.updateReview
  );

module.exports = router;
