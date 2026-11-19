const mongoose=require('mongoose')
const bcrypt=require('bcryptjs')

const adminSchema=new mongoose.Schema({
  name:{type:String,required:true,trim:true},
  email:{type:String,required:true,unique:true,lowercase:true,trim:true},
  passwordHash:{type:String,required:true,select:false},
  role:{type:String,enum:['admin'],default:'admin'}
},{timestamps:true})

adminSchema.methods.comparePassword=function(password){return bcrypt.compare(password,this.passwordHash)}
adminSchema.statics.hashPassword=password=>bcrypt.hash(password,12)

module.exports=mongoose.model('Admin',adminSchema)
