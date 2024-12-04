const express = require('express');
const router = express.Router();


// Notes Handlers
const getAllNotes = (req, res) => {
    res.status(200).json({ message: 'Fetching all notes' });
};
const getNoteById = (req, res) => {
    const { id } = req.params;
    res.status(200).json({ message: `Fetching note with id: ${id}` });
};
const createNote = (req, res) => {
    const noteData = req.body;
    res.status(201).json({ message: 'Note created', data: noteData });
};
const updateNote = (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;
    res.status(200).json({ message: `Note with id: ${id} updated`, data: updatedData });
};
const deleteNote = (req, res) => {
    const { id } = req.params;
    res.status(200).json({ message: `Note with id: ${id} deleted` });
};



// Note routes
router.get('/', getAllNotes);
router.get('/notes/:id', getNoteById);
router.post('/notes', createNote);
router.put('/notes/:id', updateNote);
router.delete('/notes/:id', deleteNote);

module.exports = router;

