const mongoose=require('mongoose')

const userSchema=new mongoose.Schema(
    {
        name:String,
        mail:String,
        ph:Number,
        password:String
    }
)

const userModel=mongoose.model('users',userSchema)
module.exports=userModel;