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
    const {limit,skip} = req.query;
    try {
        const notes = await prisma.note.findMany(
            {
                where:{
                    userId: user,
                    deletedAt: null
                },
                take: limit,
                skip: skip
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
async function getNoteById(req, res) {
    try {
        const userId = Number(req.user.userId); 
        const id = Number(req.params.id);
        const note = await prisma.note.findUnique({
            where: { id: id },
        });
        if (note && note.deletedAt === null && note.userId === userId) {
            return res.status(200).json(note); 
        }
        return res.status(404).json({ message: 'Note not found or already deleted.' });

    } catch (error) {
        console.error('Error fetching note by ID:', error);
        return res.status(500).json({ message: 'An error occurred while fetching the note.' });
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
// note soft delete by updte deletedAt field
async function deleteNote(req, res) {
    try {
        const id = Number(req.params.id);
        const userId = Number(req.user.userId);
        const note = await prisma.note.findUnique({ where: { id: id } });
        if (!note || note.deletedAt !== null) {
            return res.status(404).json({ message: 'Note not found or already deleted.' });
        }
        if (note.userId !== userId) {
            return res.status(403).json({ message: 'You do not have permission to delete this note.' });
        }
        await prisma.note.update({
            where: { id: id },
            data: { deletedAt: new Date() }, 
        });
        return res.status(200).json({ message: 'Note successfully deleted.' });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'An error occurred while deleting the note.' });
    }
}
// filtres notes by tags
async function getNotesByTags(req, res) {
    try {
        const userId = Number(req.user.userId); // Get the user ID from the auth middleware
        const tagId = Number(req.params.tagId); // Get the tagId from the URL path

        console.log("Extracted tagId:", tagId);  // Debugging statement

        if (isNaN(tagId)) {
            return res.status(400).json({ message: 'Invalid tag ID.' });
        }

        if (!tagId) {
            return res.status(400).json({ message: 'Tag ID is required.' });
        }

        // Fetch notes associated with the given tagId
        const notes = await prisma.note.findMany({
            where: {
                userId: userId,
                deletedAt: null,
                tagNote: {
                    some: {
                        tagId: tagId, // Only notes that are associated with the given tagId
                    },
                },
            },
            include: {
                tagNote: {
                    include: { tag: true },
                },
            },
        });

        if (notes.length === 0) {
            return res.status(404).json({ message: 'No notes found for the given tag.' });
        }

        res.status(200).json({ notes: notes });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while fetching notes by tag.' });
    }
}



// sorting note by created time
async function getNotesByCreatedTime(req, res) {
    try {
        const userId = Number(req.user.userId);
        const notes = await prisma.note.findMany({
            where: {
                userId: userId,
                deletedAt: null,
            },
                orderBy: {
                    createdAt: 'asc',
                    },
            });
            res.status(200).json({ notes: notes });
    } catch (error){
        console.error(error);
        res.status(500).json({ message: 'An error occurred while fetching notes sorted by created'})
    }
}

// sorting notes by last updated date
async function getNotesByLastUpdated(req, res) {
    console.log(1);
    try {
        const userId = Number(req.user.userId);
        const notes = await prisma.note.findMany({
            where: {
                userId: userId,
                deletedAt: null,
                },
                orderBy: {
                    updatedAt: 'desc',
                },
            });
            console.log(2);
            
            res.status(200).json({ notes: notes });
    } catch (error){
        console.error(error);
        res.status(500).json({ message: 'An error occurred while fetching notes sorted by last'});
    }
}

            




module.exports = {
    addTags,getTags,getTagById,updateTag,deleteTag, addCategory, getCategorys, updateCategory,getCategoryById,deletecategory, getNotes, addNote,getNoteById,deleteNote,getNotesByTags,getNotesByCreatedTime,getNotesByLastUpdated
}