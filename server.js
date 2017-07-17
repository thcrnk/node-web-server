const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
  var now = new Date().toString();
  var logLine = `${now}: ${req.method} ${req.url}` + '\n';
  fs.appendFile('server.log', logLine, (err) => {
    if (err) {
      console.log(err);
    }
  });
  next();
});

app.use((req, res, next) => {
  res.render('maintence.hbs');
});

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (req, res) => {
  res.render('home.hbs', {
    title: 'Home Page',
    welcomeMsg: 'Welcome to my website'
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    title: 'About Page'
  });
});

app.get('/projects', (req, res) => {
  res.render('projects.hbs', {
    title: 'Projects page'
  });
});

// /bad - send back json with errorMessage
app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to handle request'
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
