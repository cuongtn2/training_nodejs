const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    unique: true,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  price: {
    type: String,
    require: true,
  },
});
const Tour = mongoose.model('Tour', tourSchema);
module.exports = Tour;
