const mongoose=require('mongoose')
const schema=new mongoose.Schema({
  name:{type:String,required:true,trim:true,maxLength:100},
  phone:{type:String,required:true,trim:true,maxLength:30},
  email:{type:String,trim:true,lowercase:true,maxLength:120},
  subject:{type:String,required:true,trim:true,maxLength:180},
  message:{type:String,required:true,trim:true,maxLength:3000},
  isRead:{type:Boolean,default:false}
},{timestamps:true})
module.exports=mongoose.model('ContactEnquiry',schema)
