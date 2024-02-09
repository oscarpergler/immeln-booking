const User = require("../models/UserModel");

module.exports.getAllUsers = async (req, res, next) => {
    try{
        const allUsers = await User.find({})
        res.json(allUsers);
    }
    catch (error){
        res.status(error)
    }
    next();
}