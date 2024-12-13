const express = require('express');
const router = express.Router();
const {addTags,getTags,getTagById,updateTag,deleteTag, addCategory,getCategorys, updateCategory,getCategoryById,deletecategory, getNotes, addNote,getNoteById,deleteNote,getNotesByCreatedTime,getNotesByLastUpdated,getNotesByTags,updateNote, searchNote } = require('../controllers/notesControllers')
const {validation,errorValidatorHandler} = require('../utils/Validators')
const protect = require('../middlewares/auth')
const verifyAdmin = require('../middlewares/admin')


// notes route

// tags routes
router.post('/tags',[protect,verifyAdmin],validation.tagValidation,errorValidatorHandler,addTags)
router.get('/tags',[protect,verifyAdmin],getTags)
router.get('/tags/:id',getTagById)
router.put('/tags/:id',[protect,verifyAdmin],validation.tagValidation,errorValidatorHandler, updateTag)
router.delete('/tags/:id',[protect,verifyAdmin],deleteTag)

// Categories routes
router.get('/categories', getCategorys)
router.post('/categories',[protect,verifyAdmin],validation.categoryValidation,errorValidatorHandler,addCategory)
router.put('/categories/:id',[protect,verifyAdmin],validation.categoryValidation,errorValidatorHandler, updateCategory)
router.delete('/categories/:id',[protect,verifyAdmin],deletecategory)
router.get('/categories/:id',[protect,verifyAdmin],getCategoryById)

//  Notes routes

router.get('/',protect,getNotes)
router.get('/search',protect,searchNote)
router.get('/filterByTags/:tagId', protect, getNotesByTags);
router.get('/created',protect,getNotesByCreatedTime)
router.get('/updated',protect,getNotesByLastUpdated)
router.post('/',protect,addNote);
router.get('/:id',protect,getNoteById)
router.put('/:id',protect,validation.noteValidation,errorValidatorHandler,updateNote)
router.delete('/:id',protect,deleteNote)




module.exports = router;

