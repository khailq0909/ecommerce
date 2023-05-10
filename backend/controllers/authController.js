const User = require('../models/user')
const ErrorHandler = require('../utils/errorHandler')
const CathAsyncErrors = require('../middlewares/cathAsyncError');
const { json } = require('body-parser');

//register a user
exports.registerNewUser = CathAsyncErrors(
    async (req,res,next)=>{
        const {name, email,password} = req.body
        const user = await User.create({
            name,
            email,
            password,
        })
        res.status(201).json({
            success: true,
            user
        })
    }
)