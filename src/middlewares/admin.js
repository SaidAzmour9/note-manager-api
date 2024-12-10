async function verifyAdmin(req, res, next) {
    if (req.user.role !== 'ADMIN') {
        console.log(req.user.role);
        console.log(req.user._email);
        
        
      return res.status(403).json({ message: 'You are not authorized as an admin.' });
    }
    next();
  }
  
  module.exports = verifyAdmin;