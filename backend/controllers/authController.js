const User = require('../models/user')
const ErrorHandler = require('../utils/errorHandler')
const CathAsyncErrors = require('../middlewares/cathAsyncError');
const sendToken = require('../utils/jwtToken')
const sendEmail = require('../utils/sendEmail')
const crypto = require('crypto')

//register a user
exports.registerNewUser = CathAsyncErrors(
    async (req,res,next)=>{
        const {name, email,password} = req.body
        const user = await User.create({
            name,
            email,
            password,
        })
        sendToken(user,200,res)
    }
)
//login user /api/v1/login
exports.loginUser = CathAsyncErrors(
    async (req,res,next)=>{
        const {email, password} = req.body

        //check if email and password is entered by user
        if(!email || !password){
            return next(new ErrorHandler("Please enter email & password", 400))
        }
        const user = await User.findOne({'email': email}).select('+password')

        if(!user){
            return next(new ErrorHandler("Invalid Email or Password", 401))
        }

        //check if passwrod is correcr or not
        const isPasswordMatched = await user.comparePassword(password);
        if(!isPasswordMatched){
            return next(new ErrorHandler("Invalid Email or Password", 401))
        }

        sendToken(user,200,res)
    }
)
//logout => api/v1/logout
exports.logoutUser = CathAsyncErrors(
    async (req,res,next)=>{
        res.cookie('token', null,{
            expire: new Date(Date.now()),
            httpOnly: true
        })
        res.status(200).json({
            success: true,
            message: "Logged out"
        })
    }
)
//forgot password api/v1/password/forgot
exports.forgotPassword = CathAsyncErrors(
    async (req,res,next) =>{
        const user = await User.findOne({email: req.body.email})

        if(!user){
            return next(new ErrorHandler("User not foud with this email"), 404)
        }
        //get reset token
        const resetToken = user.getResetPasswordToken()
        await user.save({validateBeforeSave: false})
        //create reset password url
        const resetUrl = `${req.protocol}://${req.get('host')}/api/v1/password/reset/${resetToken}`

        const message = `Your Password reset token is as follow:\n\n${resetUrl}\n\nIf you have not requested this email, then ignore it`

        try{
            await sendEmail({
                email: user.email,
                subject: "Ecommerce Password Recovery",
                message
            })

            res.status(200).json({
                success: true,
                message: `Email send to ${user.email}`
            })
        }catch(error){
            user.resetPasswordExpire = undefined;
            user.resetPasswordToken = undefined;
            await user.save({validateBeforeSave: false});
            return next(new ErrorHandler(error.message, 500))
        }
    }
)
//resetpassword /api/v1/password/reset/:token
exports.resetPassword = CathAsyncErrors(async (req, res, next) => {

    // Hash URL token
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex')

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() }
    })

    if (!user) {
        return next(new ErrorHandler('Password reset token is invalid or has been expired', 400))
    }

    if (req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHandler('Password does not match', 400))
    }

    // Setup new password
    user.password = req.body.password;

    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    sendToken(user, 200, res)

})
// Get currently logged in user details   =>   /api/v1/me
exports.getUserProfile = CathAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id);

    res.status(200).json({
        success: true,
        user
    })
})
// Update / Change password   =>  /api/v1/password/update
exports.updatePassword = CathAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id).select('+password');

    // Check previous user password
    const isMatched = await user.comparePassword(req.body.oldPassword)
    if (!isMatched) {
        return next(new ErrorHandler('Old password is incorrect'));
    }

    user.password = req.body.password;
    await user.save();

    sendToken(user, 200, res)

})
//update profile => /api/v1/me/update
exports.updateProfile = CathAsyncErrors(
    async (req,res,next)=>{
        const newUserData = {
            name: req.body.name,
            email: req.body.email
        }
        const user = await User.findByIdAndUpdate(req.user.id,newUserData,{
            new:true,
            runValidators: true,
            useFindAndModify: false
        })
        sendToken(user,200,res)
    }
)
//admin route
exports.getAllUser = CathAsyncErrors(
    async (req,res,next)=>{
        const users = await User.find();

        res.status(200).json({
            success: true,
            users
        })
    }
)

//admin get user detail api/v1/admin/user/detail
exports.getUserDetail = CathAsyncErrors(
    async (req,res,next)=>{
        const user = await User.findById(req.params.id);

        if(!user){
            return next(new ErrorHandler("User is not Exit",))
        }
        res.status(200).json({
            success:true,
            user
        })
    }
)
//admin delete a user => api/v1/admin/delete/user/:id
exports.deleteUser = CathAsyncErrors(
    async (req,res,next)=>{
        const user = await User.findById(req.params.id);
        if(!user){
            return next(new ErrorHandler("user Not Found", 404))
        }
        await user.deleteOne();
        res.status(200).json({
            success: true,
            message: "user is deleted"
        })
    }
)