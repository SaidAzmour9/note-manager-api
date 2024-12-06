const prisma = require('../utils/PrismaClients');
const bcrypt = require('bcrypt');

// creeate user
async function addUser(req,res) {
    try{
        const {firstname, lastname, email, password} = req.body;
        const user = await prisma.user.create({
                data: {
                    firstname,
                    lastname,
                    email,
                    password: await bcrypt.hash(password, 10),
                    },

            }
        );
    } catch (error) {
        console.error(error);
        return res.status(400).json({message: 'error internal'})

    }
}

module.exports = {addUser};