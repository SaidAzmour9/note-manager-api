const express = require('express');
const router = express.Router();
const {addTags,getTags,getTagById,updateTag,deleteTag, addCategory,getCategorys, updateCategory,getCategoryById,deletecategory, getNotes, addNote } = require('../controllers/notesControllers')
const {validation,errorValidatorHandler} = require('../utils/Validators')
const {protect} = require('../controllers/authControllers')


// notes route

// tags routes
router.post('/tags',protect,validation.tagValidation,errorValidatorHandler,addTags)
router.get('/tags',getTags)
router.get('/tags/:id',getTagById)
router.put('/tags/:id',validation.tagValidation,errorValidatorHandler, updateTag)
router.delete('/tags/:id',deleteTag)

// Categories routes
router.get('/categories', getCategorys)
router.post('/categories',validation.categoryValidation,errorValidatorHandler,addCategory)
router.put('/categories/:id',validation.categoryValidation,errorValidatorHandler, updateCategory)
router.delete('/categories/:id',deletecategory)
router.get('/categories/:id',getCategoryById)

//  Notes routes
router.get('/',getNotes)
router.post('/', addNote);

module.exports = router;

