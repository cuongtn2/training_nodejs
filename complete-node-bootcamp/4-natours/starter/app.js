const express = require('express');
const app = express();
const fs = require('fs');

var cors = require('cors');
const { log } = require('console');
app.use(cors());

app.use(express.json());

app.use((req, res, next )=> {
    console.log('heloo middleware')
    next();
})

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
})



const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

app.get('/', (req, res) => {
  res
    .status(200)
    .json({ message: 'hello from the server side', app: 'natours' });
});
app.post('/', (req, res) => {
  res.send('you can post to this endpoint ...');
});
app.get('/getdata', (req, res) => {
  res.status(200).json({
    status: ' success',
    data: { tours },
  });
});
const getAllTours = (req, res) => {
  res.status(200).json({
      status: ' success',
      requestAT: req.requestTime,
      results: tours.length,
      data: { tours },
  });
};
const getTour = (req, res) => {
  console.log(req.params);
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);

  if (!tour) {
    return res
      .status(404)
      .json({ message: '404 not found tour ID', status: 'fail' });
  }
  res.status(200).json({
    status: ' success',
    data: { tour },
  });
};
const updateTour = (req, res) => {
  console.log(req.params);
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);

  if (!tour) {
    return res
      .status(404)
      .json({ message: '404 not found tour ID', status: 'fail' });
  }
  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated tour here ...>',
    },
  });
};
const deleteTour = (req, res) => {
  console.log(req.params);
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);

  if (!tour) {
    return res
      .status(404)
      .json({ message: '404 not found tour ID', status: 'fail' });
  }
  res.status(204).json({
    status: 'success',
    data: null,
  });
};
const createTour = (req, res) => {
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
// app.get('/api/v1/tours', getAllTours)
// app.post('/api/v1/tours', createTour)

// app.get('/api/v1/tours/:id', getTour);
// app.patch('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id', deleteTour);

app.route('/api/v1/tours').get(getAllTours).post(createTour);

app.route('/api/v1/tours/:id').get(getTour).patch(updateTour).delete(deleteTour);
const port = 5000;
app.listen(port, () => {
  console.log('listening on port ' + port);
});