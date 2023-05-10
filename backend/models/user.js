const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs')

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
        minLength:[8, "Your password must be longer than 8 characters"]
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

module.exports = mongoose.model('User', userSchema);