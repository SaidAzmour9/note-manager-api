
const jwt = require('jsonwebtoken');

async function protect(req, res, next) {
    const token = req.cookies.token;
    if (!token) {
        return res.render('auth/login');
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decoded;

        next();
    } catch (error) {
            res.status(400).json({ message: 'Invalid error' });
    }
}

module.exports = protect;