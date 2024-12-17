const prisma = require('../utils/PrismaClients');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



async function signUp(req, res, next) {
    try {
        console.log(1);
        const { firstname, lastname, email, password } = req.body;
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            req.flash('error', 'Email is already in use.');
            return res.redirect('/auth/signup');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: {
                firstname,
                lastname,
                email,
                password: hashedPassword,
            },
        });
        req.flash('success', 'Account created successfully.');
        return res.redirect('/auth/login');  // Redirect to login page after successful signup

    } catch (error) {
        console.error('Error during sign up:', error);
        req.flash('error', 'An error occurred during sign-up. Please try again later.');
        return res.redirect('/auth/signup');  
    }
}




async function login(req, res,next) {
    try {
        const { email, password } = req.body;
        console.log(email,password);
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        
        const token = jwt.sign({ userId: user.id,email: user.email,
            role: user.role }, process.env.JWT_SECRET_KEY, {
            expiresIn: process.env.JWT_EXPIRED_TIME
        });
        res.cookie('token', token, { httpOnly: true, secure: true });
        res.redirect('/notes');
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message });
    }
}

async function logOut(req, res, next) {
    try {
        const token = req.cookies.token;
        if (token) {
            res.clearCookie('token', { httpOnly: true, secure: true, sameSite: 'None' });
            res.json({ message: 'Logged out successfully' });
            return res.redirect('/auth/login');
        }
        return res.redirect('/auth/login');
    } catch (error) {
        if (!res.headersSent) {
            res.status(400).json({ message: error.message });
        }
    }
}









module.exports = {signUp,login,logOut}