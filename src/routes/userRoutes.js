// const express = require('express');
// const router = express.Router();
// const {SignUp, logIn} = require('../controllers/usersControllers');
// const { validation,errorValidatorHandler } = require('../utils/Validators');



// const getUserById = (req, res) => {
//     const { id } = req.params;
//     res.status(200).json({ message: `Fetching user with id: ${id}` });
// };

// const updateUser = (req, res) => {
//     const { id } = req.params;
//     const updatedData = req.body;
//     res.status(200).json({ message: `User with id: ${id} updated`, data: updatedData });
// };
// const deleteUser = (req, res) => {
//     const { id } = req.params;
//     res.status(200).json({ message: `User with id: ${id} deleted` });
// };

// // User routes
// router.get('/users/:id', getUserById);
// router.post('/signup',validation.userValidation,errorValidatorHandler,SignUp);
// router.post('/login', logIn);
// router.put('/users/:id', updateUser);
// router.delete('/users/:id', deleteUser);



// module.exports = router;