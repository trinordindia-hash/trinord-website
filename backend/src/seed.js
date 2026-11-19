require('dotenv').config()
const mongoose=require('mongoose')
const Admin=require('./models/Admin')
const {BusinessArea,Product,GalleryImage,SiteSettings}=require('./models/Content')

async function seed(){
  if(!process.env.MONGODB_URI||!process.env.ADMIN_EMAIL||!process.env.ADMIN_PASSWORD)throw new Error('MONGODB_URI, ADMIN_EMAIL and ADMIN_PASSWORD are required')
  await mongoose.connect(process.env.MONGODB_URI)
  if(!await Admin.findOne({email:process.env.ADMIN_EMAIL.toLowerCase()})){
    await Admin.create({name:'TRINORD Administrator',email:process.env.ADMIN_EMAIL.toLowerCase(),passwordHash:await Admin.hashPassword(process.env.ADMIN_PASSWORD)})
  }
  await mongoose.disconnect()
  console.log('Admin seed complete')
}
seed().catch(error=>{console.error(error.message);process.exit(1)})
