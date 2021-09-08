const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const { render } = require('ejs');
const noteRoutes = require('./routes/noteRoute');

// Express app
const app = express();

// Connect to MongoDB
const dbURI = 'mongodb+srv://netninja:test123@freecluster.upra7.mongodb.net/Epitome?retryWrites=true&w=majority';
mongoose.connect(dbURI, {useNewUrlParser : true, useUnifiedTopology: true})
.then((result) => app.listen(3000)) //Server starts listening once db is connected
.catch((err) => console.log(err));

// Register view engine
app.set('view engine', 'ejs');
app.set('views');

// Middleware & Static files
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));

// Homepage
app.get('/', (req,res) => {
    res.redirect('/notes');
});

// About page
app.get('/about', (req,res) => {
    res.render('about', {page: 'About'});
});

//Search page
app.get('/search', (req,res) => {
    res.render('search', {page: 'Search'});
});

// Note Routes
app.use('/notes', noteRoutes);
