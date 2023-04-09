// const fs = require('fs');
const Tour = require('../models/tourModel');
// const tours = JSON.parse(
//   fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
// );

//check id before send request
// exports.checkID = (req, res, next, val) => {
//   console.log(`tour id is : ${val}`);
//   if (req.params.id * 1 > tours.length) {
//     return res
//       .status(404)
//       .json({ message: '404 not found tour ID', status: 'fail' });
//   }
//   next();
// };

//check id before send request
// exports.checkBody = (req, res, next) => {
//   if (!req.body.name || !req.body.price) {
//     return res
//       .status(404)
//       .json({ message: 'Missing name or price', status: 'fail' });
//   }
//   next();
// };

exports.getAllTours = async (req, res) => {
  try {
    //build query
    console.log(req.query);
    const queryObj = { ...req.query };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach((field) => delete queryObj[field]);
    const query = Tour.find(queryObj);
    // const tours =  Tour.find()
    //   .where('duration')
    //   .equals(5)
    //   .where('difficulty')
    //   .equals('easy');
    
    //excute tour
    const tours = await query;
    console.log(queryObj);
    res.status(200).json({
      status: ' success',
      results: tours.length,
      data: { tours },
    });
  } catch (error) {
    res.status(404).json({ message: error, status: 'fail' });
  }
};
exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    console.log('tour', tour);
    //Tour.findOne({_id: req.params.id})
    res.status(200).json({
      status: ' success',
      data: { tour },
    });
  } catch (error) {
    res.status(404).json({ message: error, status: 'fail' });
  }
};
exports.updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    console.log(req.params);
    res.status(200).json({
      status: 'success',
      data: {
        tour: tour,
      },
    });
  } catch (error) {
    res.status(404).json({ message: error, status: 'fail' });
  }
};
exports.deleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);
    console.log(req.params);
    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (error) {
    res.status(404).json({ message: error, status: 'fail' });
  }
};
exports.createTour = async (req, res) => {
  console.log(req.body);
  try {
    const newTours = await Tour.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        tours: newTours,
      },
    });
  } catch (error) {
    res.status(400).json({ message: error, status: 'fail' });
  }
};
