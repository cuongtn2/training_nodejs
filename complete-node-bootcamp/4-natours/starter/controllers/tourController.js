const fs = require('fs');
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);
//check id before send request
exports.checkID = (req, res, next, val) => {
    console.log(`tour id is : ${val}`);
    if (req.params.id * 1 > tours.length) {
        return res
          .status(404)
          .json({ message: '404 not found tour ID', status: 'fail' });
    }
    next();
}

//check id before send request
exports.checkBody = (req, res, next) => {
    if (!req.body.name || !req.body.price ) {
        return res
          .status(404)
          .json({ message: 'Missing name or price', status: 'fail' });
    }
    next();
}


exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: ' success',
    requestAT: req.requestTime,
    results: tours.length,
    data: { tours },
  });
};
exports.getTour = (req, res) => {
  console.log(req.params);
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);

  res.status(200).json({
    status: ' success',
    data: { tour },
  });
};
exports.updateTour = (req, res) => {
  console.log(req.params);
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);
  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated tour here ...>',
    },
  });
};
exports.deleteTour = (req, res) => {
  console.log(req.params);
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);
  res.status(204).json({
    status: 'success',
    data: null,
  });
};
exports.createTour = (req, res) => {
  console.log(req.body);
  const newID = tours[tours.length - 1].id + 1;
  const newTours = Object.assign({ id: newID }, req.body);
  tours.push(newTours);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tours: newTours,
        },
      });
    }
  );
};
