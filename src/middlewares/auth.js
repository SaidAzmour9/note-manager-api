
const jwt = require('jsonwebtoken');

async function protect(req, res, next) {
    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).json({ message: 'you not login .' });
        }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decoded;

        next();
    } catch (error) {
            res.status(400).json({ message: 'Invalid token' });
    }
}

module.exports = protect;