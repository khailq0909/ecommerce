const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required: [true, "Please Enter Your Name"],
        maxLength:[30, "Your name cannot exeed 30 characters"]
    },
    email:{
        type:String,
        required: [true, "Please Enter Your Email"],
        uniqye: true,
        validate: [validator.isEmail, "Please enter valid email"]
    },
    password:{
        type:String,
        required: [true, "Please Enter Your Password"],
        minLength:[8, "Your password must be longer than 8 characters"],
        select: false
    },
    avatar:{
        public_id: {
            type: String,
            required: false
        },
        url: {
            type: String,
            required: false
        }
    },
    role:{
        type: String,
        default: "user"
    },
    createAt:{
        type:Date,
        default: Date.now
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date
})
//encrypting password before saving user
userSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        next()
    }

    this.password = await bcrypt.hash(this.password,10);   
})
//compare user password
userSchema.methods.comparePassword = async function(enterdPassword){
    return await bcrypt.compare(enterdPassword, this.password)
}

// return JWT
userSchema.methods.getJwtToken = function (){
    return jwt.sign({ id: this._id}, process.env.JWT_SECRET,{
        expiresIn: process.env.JWT_EXPIRES_TIME
    })
}
//generate password reset token
userSchema.methods.getResetPasswordToken = function(){
    //generate token
    const resetToken = crypto.randomBytes(20).toString('hex')
    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex')
    this.resetPasswordExpire = Date.now() + 30 * 60 * 1000
    return resetToken
}

module.exports = mongoose.model('User', userSchema);