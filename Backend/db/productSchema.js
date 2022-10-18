const mongoose= require('mongoose');

const productSchema= new mongoose.Schema(
    {
        pname:String,
        company:String,
        category:String,
        price:Number,
        userid:String,
    }
)
const productmodel=mongoose.model('products',productSchema)
module.exports=productmodel