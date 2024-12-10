const prisma = require('../utils/PrismaClients')


// tags functions
async function addTags(req,res,next) {
    try{
        const data = req.body; 
        const tag = await prisma.tag.create({data});
        res.status(201).json({message: 'tag added'})
    } catch (error){
        res.status(500).json({message: 'error adding tag'})
    }
}
async function getTags(req, res, next) {
    try {
        const tags = await prisma.tag.findMany();
        res.status(200).json(tags);
    } catch (error) {
        res.status(500).json({ message: 'error fetching tags' });
        }
}
async function getTagById(req,res,next) {
    try {
        const id = parseInt(req.params.id);
        const tag = await prisma.tag.findUnique({where: {id}});
        if (tag) {
            res.status(200).json(tag);
        }else{
            res.status(404).json({message: 'tag not found'})
        }
    } catch (error) {
        res.status(500).json({message: 'error fetching tag by id'})
    }   
}
async function updateTag(req,res){
    try {
        const id = parseInt(req.params.id);
        console.log(id)
        const data = req.body;
        console.log(data)
        const tag = await prisma.tag.update({where: {id}, data});
        res.status(200).json({message: 'tag updated'});
    } catch (error) {
        res.status(500).json({message: 'error updating tag'});
    }
}
async function deleteTag(req,res) {
    try {
        const id = parseInt(req.params.id);
        const tag = await prisma.tag.delete({where: {id}});
        if(tag){
            res.status(200).json({message: 'tag deleted'})
        }else{
            res.status(404).json({message: 'tag not found'})
        }
        } catch (error) {
            res.status(500).json({message: 'error deleting tag'});
        }
 }

// Categorys functions
async function addCategory(req,res) {
    try {
        const data = req.body;
        const category = await prisma.category.create({data});
        res.status(200).json({message: 'category created'});
        } catch (error) {
            res.status(500).json({message: 'error creating category'});
        }

}
async function updateCategory(req,res) {
    try {
        const id = parseInt(req.params.id);
        const data = req.body;
        const category = await prisma.category.update({where: {id}, data});
        res.status(200).json({message: 'category updated'});
    } catch (error) {
        res.status(500).json({message: 'error updating category'});
    }
}
async function getCategorys(req,res) {
    try {
        const categorys = await prisma.category.findMany();
        if(categorys.length > 0){
            res.status(200).json(categorys);
        }else{
            res.status(404).json({message: 'no categories found'})
        }
        } catch (error) {
            res.status(500).json({message: 'error fetching categorys'});
        }

}
async function deletecategory(req,res) {
    try {
        const id = parseInt(req.params.id);
        const category = await prisma.category.delete({where: {id}});
        if(category){
            res.status(200).json({message: 'category deleted'})
        }else{
                res.status(404).json({message: 'category not found'})
        }
    }catch (error) {
        res.status(500).json({message: 'error deleting category'});
    }
}
async function getCategoryById(req,res) {
    try {
        const id = parseInt(req.params.id);
        const category = await prisma.category.findUnique({where: {id}});
        if(category){
            res.status(200).json(category);
        }else{
            res.status(404).json({message: 'category not found'})
        }
    } catch (error) {
        res.status(500).json({message: 'error fetching category by id'});
    }
}

// notes functioons
async function getNotes(req,res) {
    const user = req.user.userId;
    try {
        const notes = await prisma.note.findMany(
            {
                where:{
                    userId: user
                }
            });
            if(notes.length > 0)
                res.status(200).json(notes);
            else
                res.status(404).json({message: 'no notes found'});
    }catch (error) {
        res.status(500).json({message: 'error fetching notes'});
    }
}

// get note by id
async function getNoteById(req,res) {
    try {
        const user = req.user.userId;
        const id = Number(req.params.id);
        const note = await prisma.note.findUnique({where: {id,userId: user}})
        if(note){
            res.status(200).json(note);
        }else{
            res.status(404).json({message: 'note not found'})
            }
    } catch (error) {
        console.log(error);
        
        res.status(500).json({message: 'error fetching note by id'});
    }
}


async function addNote(req,res) {
    try {
        const userId = req.user.userId;
        console.log(userId);
        const { content, categoryId, tagIds } = req.body;
        if (!content || !categoryId || !userId) {
          return res.status(400).json({ message: 'Content, categoryId, and userId are required.' });
        }
        // Check if category exists
        const category = await prisma.category.findUnique({
          where: { id: Number(categoryId) },
        });
        if (!category) {
          return res.status(404).json({ message: 'Category not found.' });
        }
    
        // Validate tags
        if (tagIds && tagIds.length > 0) {
          const validTags = await prisma.tag.findMany({
            where: { id: { in: tagIds } },
          });
    
          if (validTags.length !== tagIds.length) {
            return res.status(400).json({ message: 'One or more tag IDs are invalid.' });
          }
        }
    
        // Create the note
        const newNote = await prisma.note.create({
          data: {
            content,
            categoryId: Number(categoryId),
            userId: Number(userId),
            tagNote: {
              create: tagIds?.map((tagId) => ({
                tagId: Number(tagId),
              })) || [],
            },
          },
          include: {
            tagNote: {
              include: { tag: true },
            },
            category: true,
          },
        });
    
        res.status(201).json({ message: 'Note added successfully.', note: newNote });
      } catch (error) {
        res.status(500).json({ message: 'An error occurred while adding the note.' });
      }
}

// delete note
async function deleteNote(req, res) {
    try {
        const id = Number(req.params.id);
        const userId = Number(req.user.userId);
        const note = await prisma.note.findUnique({ where: { id: id } });
        if (!note) {
            return res.status(404).json({ message: 'Note not found.' });
        }
        console.log(userId);
        console.log(note.userId);
        
        if (note.userId !== userId) {
            return res.status(403).json({ message: 'You do not have permission to delete this.' });
        }
        
        
        //await prisma.note.delete({ where: { id: Number(noteId) } });
        res.status(200).json({ message: 'Note deleted successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while deleting the note.' });
    }
}






module.exports = {
    addTags,getTags,getTagById,updateTag,deleteTag, addCategory, getCategorys, updateCategory,getCategoryById,deletecategory, getNotes, addNote,getNoteById,deleteNote
}