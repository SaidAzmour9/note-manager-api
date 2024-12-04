const express = require('express');
const router = express.Router();


const getAllUsers = (req, res) => {
    res.status(200).json({ message: 'Fetching all users' });
};
const getUserById = (req, res) => {
    const { id } = req.params;
    res.status(200).json({ message: `Fetching user with id: ${id}` });
};
const createUser = (req, res) => {
    const userData = req.body;
    res.status(201).json({ message: 'User created', data: userData });
};
const updateUser = (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;
    res.status(200).json({ message: `User with id: ${id} updated`, data: updatedData });
};
const deleteUser = (req, res) => {
    const { id } = req.params;
    res.status(200).json({ message: `User with id: ${id} deleted` });
};

// User routes
router.get('/', getAllUsers);
router.get('/users/:id', getUserById);
router.post('/users', createUser);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);



module.exports = router;