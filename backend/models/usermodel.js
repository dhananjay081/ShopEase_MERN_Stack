
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt  = require("bcrypt");
const jwt = require("jsonwebtoken")
const crypto = require("crypto");
const { type } = require("os");

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        require:[true, "Please Enter Your Name"],
        maxLength:[30,"Name cannot exceed 30 characters"],
        minLength:[4.,"Name should have more than 4 characters"]
    },
    email:{
        type:String,
        require:[true, "Please Enter Your Email"],
        unique:true,
        validate:[validator.isEmail, "Please Enter Your valid Email"]
    },
    password: {
        type:String,
        require:[true, "Please Enter Your Password"],
        minLength:[8,"Name should have greater than 8 characters"],
        select: false,
    },
    avatar: {
        public_id:{
            type:String,
            required: true
        }, 
        url:{
            type:String,
            required: true
        }
    },
    role: {
        type: String,
        default: "user", // Default role is "user"
    },
    createdAt : {
        type : Date,
        default: Date.now,
    },
    
    resetPasswordToken: String,
    resetPasswordExpire:Date,
})

userSchema.pre("save" , async function(next){
    if(!this.isModified("password")){
        next();
    }
    this.password = await bcrypt.hash(this.password,10)
})

//  JWT TOKEN
userSchema.methods.getJWTToken = function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRE,
    });
};

// Comapre Password
userSchema.methods.comparePassword = async function (enterdPassword){
    return await bcrypt.compare(enterdPassword , this.password);
}

// Generate Password Reset Token
userSchema.methods.getResetPasswordToken = function (){
    
    // Generating Token
    const resetToken = crypto.randomBytes(20).toString("hex");

    // Hash the token and set it to the resetPasswordToken field in the user schema
     this.resetPasswordToken = crypto
    .createHash("sha256") 
    .update(resetToken)
    .digest("hex");

    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
    return resetToken;
}

module.exports = mongoose.model("User",userSchema);
