const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
require('dotenv').config();
const nodemailer = require('nodemailer');
const session = require('express-session');
const flash = require('connect-flash');

app.use(session({ secret: process.env.SECRET_KEY, resave: false, saveUninitialized: true }));
app.use(flash());




port = process.env.PORT || 3301;
 
// const userRoutes = require('./src/routes/userRoutes');
const notesRoutes = require('./src/routes/notesRoutes');
const authRoutes = require('./src/routes/authRoutes');
const errorHandling = require('./src/middlewares/errorHandler');
const path = require('path');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));
// static public file
app.use(express.static(path.join(__dirname, 'public')));




// //users routes
// app.use('/users', userRoutes);
//notes routes
app.use('/notes', notesRoutes);
// auth routes
app.use('/auth', authRoutes);

app.use((req, res) => {
    res.status(404).render('404');
});
//error handling
app.use(errorHandling);


app.use((req, res, next) => {
    res.locals.successMessage = req.flash('success');
    res.locals.errorMessage = req.flash('error');
    next();
});


//server
const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

