const express = require('express');
const tourController = require('../controllers/tourController');
const router = express.Router();

//check id in middleware before send request
// router.param('id', tourController.checkID);

//Create a checkBody middleware
// Check if body contains the name and price property
// If not, send back 400 ( bad request)
// Add it to the pót  handler stack
router
  .route('/top-5-cheap')
  .get(tourController.aliasTopTours, tourController.getAllTours);

router.route('/tour-stats').get(tourController.getTourStats);

router
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.createTour);

router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;