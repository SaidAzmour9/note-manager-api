const prisma = require('../utils/PrismaClients');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


async function signUp(req,res) {
    try {
        const { firstname,lastname, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return res.status(409).json({ message: 'Email is already in use' });
        }
        const user = await prisma.user.create({
            data: {
                firstname,
                lastname,
                email,
                password: hashedPassword
            }
        });
        
        // generate token
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET_KEY, {
            expiresIn: process.env.JWT_EXPIRED_TIME
            });
        res.json({ token, user });
        } catch (error) {
            res.status(400).json({ message: error.message });
    }   
}

// auth login
async function login(req, res) {
    try {
        const { email, password } = req.body;
        const user = await prisma.user.findUnique({ where: { email } });
        //const isValidPassword = await bcrypt.compare(password, user.password);
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        // generate token
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET_KEY, {
            expiresIn: process.env.JWT_EXPIRED_TIME
        });
        res.json({ token, user });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

module.exports = {signUp,login}