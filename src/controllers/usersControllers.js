// const prisma = require('../utils/PrismaClients');
// const bcrypt = require('bcrypt');

// // creeate user

// async function SignUp(req, res) {
//     try {
//         const { firstname, lastname, email, password } = req.body;
//         if (!firstname || !lastname || !email || !password) {
//             return res.status(400).json({ message: 'All fields are required' });
//         }
//         const existingUser = await prisma.user.findUnique({ where: { email } });
//         if (existingUser) {
//             return res.status(409).json({ message: 'Email is already in use' });
//         }
//         const hashedPassword = await bcrypt.hash(password, 10);
//         const newUser = await prisma.user.create({
//             data: {
//                 firstname,
//                 lastname,
//                 email,
//                 password: hashedPassword,
//             },
//         });
//         return res.status(201).json({ message: 'Sign-up successful', user: { id: newUser.id, email: newUser.email, password: newUser.password } });
//     } catch (error) {
//         console.error('Sign-up error:', error);
//         return res.status(500).json({ message: 'Internal server error' });
//     }
// }


// async function logIn(req, res) {
//     try {
//         const { email, password } = req.body;
//         const user = await prisma.user.findUnique({ where: { email } });
//         if (!user) {
//             return res.status(401).json({ message: 'Invalid email or password' });
//         }
//         const isValidPassword = await bcrypt.compare(password, user.password);
//         if (!isValidPassword) {
//             return res.status(401).json({ message: 'Invalid email or password' });
//         }
//             return res.json({ message: 'Logged in successfully' });
//     } catch (error) {
//         return res.status(400).json({ message: 'error internal' });
//     } 
// }


// module.exports = {SignUp, logIn};