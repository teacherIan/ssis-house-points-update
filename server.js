const express = require('express');
const app = express();
const path = require('path');
const PORT = 1234;
const fs = require('fs');
const exphbs = require('express-handlebars');
// const houses = require('./points.json');

app.use('/public', express.static(path.join(__dirname, 'public')));

let houses = [
  {
    id: 1,
    house: 'Sapphire',
    points: 100,
  },
  {
    id: 2,
    house: 'Ruby',
    points: 200,
  },
  {
    id: 3,
    house: 'Amber',
    points: 300,
  },
  {
    id: 4,
    house: 'Perl',
    points: 400,
  },
];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

//Homepage route
app.get('/', (req, res) => {
  res.render('index', {
    title: 'My title',
    houses,
  });
});

app.post('/add', (req, res) => {
  houses.forEach((house) => {
    if (req.body.house == house.house) {
      house.points += +req.body.amount;
    }
  });

  res.redirect('/');
});

app.get('/get', (req, res) => {
  res.json(houses);
});

app.listen(process.env.PORT || PORT, () => {
  console.log(`Now listening on port ${PORT}`);
});
