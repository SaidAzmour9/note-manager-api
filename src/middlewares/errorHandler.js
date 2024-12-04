
const errorHandling = (err, req, res, next)=>{
    console.error(err.message)
        res.status(500).send({message: "Internal Server Error"})
}

module.exports = errorHandling;