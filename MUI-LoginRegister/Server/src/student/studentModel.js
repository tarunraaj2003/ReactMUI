var mongoose=require("mongoose");
const jwt=require("jsonwebtoken");
var Schema=mongoose.Schema;
require("dotenv").config();
var studentSchema=new Schema({
    firstname:{
        type:String,
        required:[true,"first name is required"]
    },
    lastname:{
        type:String,
        required:[true,"last name is required"]
    },
    email:{
        type:String,
        required:[true,"email is required"]
    },
    password:{
        type:String,
        required:[true,"password is required"]
    },
    address:{
        type:String,
        required:[true,"address is required"]
    },
    mobile:{
        type:String,
        required:[true,"mobile is required"]
    }
});

studentSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id:this._id,firstname:this.firstname
    ,lastname:this.lastname,email:this.email,
    address:this.address,mobile:this.mobile},process.env.ACCESS_TOKEN,{expiresIn:"2d"})
    return token
 };
 

module.exports=mongoose.model("students",studentSchema)