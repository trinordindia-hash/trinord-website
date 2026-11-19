const mongoose=require('mongoose')

const localized=new mongoose.Schema({en:{type:String,default:''},mr:{type:String,default:''}},{_id:false})

const businessAreaSchema=new mongoose.Schema({
  name:localized,shortDescription:localized,description:localized,
  imageUrl:{type:String,default:''},active:{type:Boolean,default:true},slug:{type:String,required:true,unique:true}
},{timestamps:true})
const productSchema=new mongoose.Schema({
  name:localized,description:localized,category:{type:String,required:true},
  imageUrl:{type:String,default:''},featured:{type:Boolean,default:true},active:{type:Boolean,default:true}
},{timestamps:true})
const gallerySchema=new mongoose.Schema({title:localized,category:{type:String,default:'General'},imageUrl:{type:String,required:true},active:{type:Boolean,default:true}},{timestamps:true})
const settingsSchema=new mongoose.Schema({
  phones:[{type:String}],email:{type:String,default:''},address:{type:String,default:''},
  whatsapp:{type:String,default:'917507192292'},homeContent:localized,companyIntroduction:localized,vision:localized,mission:localized
},{timestamps:true})

module.exports={
  BusinessArea:mongoose.model('BusinessArea',businessAreaSchema),
  Product:mongoose.model('Product',productSchema),
  GalleryImage:mongoose.model('GalleryImage',gallerySchema),
  SiteSettings:mongoose.model('SiteSettings',settingsSchema)
}
