const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');
const userController = require('./Controllers/userControllers');
const randomController = require('./Controllers/randomController.js');

// const recipeController = require('./controllers/recipeController');
require('./databaseInit');

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: 'secret', resave: true, saveUninitialized: true }));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public'));
// Routes
app.get('/', (req, res) => {
    res.render('index');
});


app.get('/register', userController.registerForm);
app.post('/register', userController.register);
app.get('/login', userController.loginForm);
app.post('/login', userController.login);
app.get('/logout', userController.logout);


app.get('/home', (req, res) => {
    res.render('home');
});

app.get('/generate', randomController.generateRandomCharacter);

app.get('/random', (req, res) => {
    res.render('random');
});



const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});