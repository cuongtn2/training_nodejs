const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, 'A tour must have a name'],
    unique: true,
    trim: true,
  },
  durations: {
    type: Number,
    require: [true, 'A tour must have a duration'],
  },
  maxGroupSize: {
    type: Number,
    require: [true, 'A tour must have a maxGroupSize'],
  },
  difficulty: {
    type: String,
    require: [true, 'A tour must have a difficulty'],
  },
  ratingsAverage: {
    type: Number,
    default: 4.5,
  },
  ratingsQuantity: {
    type: Number,
    default: 0,
  },
  price: {
    type: String,
    require: [true, 'A tour must have a price'],
  },
  priceDiscount: {
    type: String,
  },
  summery: {
    type: String,
    trim: true,
    require: [true, 'A tour must have a summery'],
  },
  description: {
    type: String,
    trim: true,
  },
  imgCover: {
    type: String,
    trim: true,
    require: [true, 'A tour must have a imgCover'],
  },
  images: [String],
  createAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
  startDates: [Date],
});
const Tour = mongoose.model('Tour', tourSchema);
module.exports = Tour;
