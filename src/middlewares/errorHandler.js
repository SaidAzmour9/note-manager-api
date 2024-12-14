
const errorHandling = (err, req, res, next)=>{
    console.error(err.message)
        res.status(500).send({message: err.message})
}

module.exports = errorHandling;