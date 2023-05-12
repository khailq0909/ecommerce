const User = require('../models/user')
const CathAsyncErrors = require('./cathAsyncError');
const ErrorHandler = require('../utils/errorHandler')
const jwt = require('jsonwebtoken')
exports.isAuthenticatedUser =  CathAsyncErrors(
    async (req,res,next)=>{
        const {token} = req.cookies
        console.log(token)
        if(!token){
            return next(new ErrorHandler("Login first to access this resource.", 401))
        }
        const decode = jwt.verify(token, process.env.JWT_SECRET)
        req.user = await User.findById(decode.id)
        next()
    }

)

exports.authorrizeRole = (...roles)=>{
    return(req,res,next)=>{
        if(!roles.includes(req.user.role)){
            return next(new ErrorHandler(`Role (${req.user.role}) are not accepted to this resource`, 403))
            
        }
        next()
    }
}