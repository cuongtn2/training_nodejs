// const fs = require('fs');
const Tour = require('../models/tourModel');
const APIFeatures = require('./../utils/apiFeatures');
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
exports.aliasTopTours = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'name,price,description';
  next();
};

exports.getAllTours = async (req, res) => {
  try {
    //build query
    //1a) filtering
    // const queryObj = { ...req.query };
    // const excludedFields = ['page', 'sort', 'limit', 'fields'];
    // excludedFields.forEach((field) => delete queryObj[field]);

    // //1b) advanced fillterling
    // let queryStr = JSON.stringify(queryObj);
    // queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    // let query = Tour.find(JSON.parse(queryStr));
    //gte,gt,lte,lt
    //{difficulty: 'easy' , rating: {$gte: 5}}
    // const tours =  Tour.find()
    //   .where('duration')
    //   .equals(5)
    //   .where('difficulty')
    //   .equals('easy');

    //2) sorting
    // if (req.query.sort) {
    //   const sortBy = req.query.sort.split(',').join(' ');
    //   console.log(sortBy);
    //   query = query.sort(sortBy);
    // } else {
    //   query = query.sort('-createAt');
    // }

    // 3 Field limit
    // if (req.query.fields) {
    //   console.log(req.query.fields);

    //   const field = req.query.fields.split(',').join(' ');
    //   query = query.select(field);
    // } else {
    //   query = query.select('-__v');
    // }

    //4 ) pagination
    //page=2&limit=10 , 1-10 page 1, 11-20 page 2 m 21-30 page 3
    // const page = req.query.page * 1 || 1;
    // const limit = req.query.limit * 1 || 10;
    // const skip = (page - 1) * limit;
    // query = query.skip(skip).limit(limit);
    // if (req.query.page) {
    //   const countPage = await Tour.countDocuments();
    //   if (skip >= countPage) throw new Error('This page does not exist');
    // }
    //excute tour
    const features = new APIFeatures(Tour.find(), req.query)
      .filter()
      .sort()
      .limitField()
      .paginate();
    const tours = await features.query;
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

exports.getTourStats = async (req, res) => {
  try {
    const stats = await Tour.aggregate([
      {
        $match: { ratingsAverage: { $gte: 4.5 } },
      },
      {
        $group: {
          _id: '$difficulty',
          sumTours: { $sum: 1 },
          sumRating: { $sum: '$ratingsQuantity' },
          avgRating: { $avg: '$ratingsAverage' },
          avgPrice: { $avg: '$price' },
          minPrice: { $min: '$price' },
          maxPrice: { $max: '$price' },
        },
      },
      {
        $sort: { minPrice: 1 },
      },
      // {
      //   $match: { _id: { $ne: 'easy' } },
      // },
    ]);
    res.status(200).json({ status: 'success', data: { stats } });
  } catch (error) {
    res.status(400).json({ message: error, status: 'fail' });
  }
};
