const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require('../../models/tourModel');

dotenv.config({ path: './config.env' });
const DB = process.env.DATABASE;
mongoose
  .connect(DB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('DB connect successfull');
  });
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8')
);
//import tours
const importData = async (req, res) => {
  try {
    await Tour.create(tours);
    console.log('Tour created successfully');
  } catch (error) {
    console.log(error);
  }
  process.exit();
};
//delete all collections tour from db
const deleteAll = async () => {
  try {
    await Tour.deleteMany();
    console.log('Tour delete All successfully');
  } catch (error) {
    console.log(error);
  }
  process.exit();
};
if (process.argv[2] == '--import') {
  importData();
} else if (process.argv[2] == '--delete') {
  deleteAll();
}
console.log(process.argv);
