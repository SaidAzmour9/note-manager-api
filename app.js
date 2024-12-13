const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
require('dotenv').config();
const nodemailer = require('nodemailer');



port = process.env.PORT || 3301;
 
// const userRoutes = require('./src/routes/userRoutes');
const notesRoutes = require('./src/routes/notesRoutes');
const authRoutes = require('./src/routes/authRoutes');
const errorHandling = require('./src/middlewares/errorHandler');

app.use(express.json()); 
app.use(cookieParser());

// //users routes
// app.use('/users', userRoutes);
//notes routes
app.use('/notes', notesRoutes);
// auth routes
app.use('/auth', authRoutes);


//error handling
app.use(errorHandling);





//server
const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

