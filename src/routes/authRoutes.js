const express = require('express');
const router = express.Router();
const {signUp,login,logOut} = require('../controllers/authControllers');
const { validation,errorValidatorHandler } = require('../utils/Validators');




// auth routes
router.get('/login', async (req, res) => {
    try {
        const tokenx = req.cookies.token;
        if (tokenx) {
            return res.redirect('/notes');
        }
        res.render('auth/login');
    } catch (error) {
        console.error('Error rendering login page:', error.message);
        res.status(500).send('Internal Server Error');
    }
});
router.post('/signup',validation.authSignValidation,errorValidatorHandler, signUp);
router.post('/login', login);
router.post('/logout', logOut);


module.exports = router;