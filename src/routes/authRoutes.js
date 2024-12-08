const express = require('express');
const router = express.Router();
const {signUp,login} = require('../controllers/authControllers');
const { validation,errorValidatorHandler } = require('../utils/Validators');




// auth routes
router.post('/signup',validation.authSignValidation,errorValidatorHandler, signUp);
router.post('/login', login);



module.exports = router;