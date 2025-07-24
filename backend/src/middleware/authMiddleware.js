const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');


const User = require('../models/User');

const authenticateToken =   (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Access token required' });
    }

    jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret', async  (err, {userId}) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid or expired token' });
        }


        console.log(userId, "userID")
                const objectId = new mongoose.Types.ObjectId(userId);

        const user = await User.findById(objectId)

        if (!user){
            return res.status(404).send({message: "user not found"})
        }
        req.user = user;
        next();
    });
};

module.exports = authenticateToken;