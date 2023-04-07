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

exports.getAllTours = (req, res) => {
  // res.status(200).json({
  //   status: ' success',
  //   requestAT: req.requestTime,
  //   results: tours.length,
  //   data: { tours },
  // });
};
exports.getTour = (req, res) => {
  console.log(req.params);
  // const id = req.params.id * 1;
  // const tour = tours.find((el) => el.id === id);

  // res.status(200).json({
  //   status: ' success',
  //   data: { tour },
  // });
};
exports.updateTour = (req, res) => {
  console.log(req.params);
  // const id = req.params.id * 1;
  // const tour = tours.find((el) => el.id === id);
  // res.status(200).json({
  //   status: 'success',
  //   data: {
  //     tour: '<Updated tour here ...>',
  //   },
  // });
};
exports.deleteTour = (req, res) => {
  // console.log(req.params);
  // const id = req.params.id * 1;
  // const tour = tours.find((el) => el.id === id);
  // res.status(204).json({
  //   status: 'success',
  //   data: null,
  // });
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
    res.status(400).json({ message: 'invalid data sent!', status: 'fail' });
  }
};
