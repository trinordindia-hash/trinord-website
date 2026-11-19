const router=require('express').Router()
const auth=require('../middleware/auth')
const {BusinessArea,Product,GalleryImage,SiteSettings}=require('../models/Content')

const crud=(Model)=>({
  list:async(req,res,next)=>{try{res.json(await Model.find(req.path.includes('/public')?{active:true}:{}).sort({createdAt:-1}))}catch(e){next(e)}},
  create:async(req,res,next)=>{try{res.status(201).json(await Model.create(req.body))}catch(e){next(e)}},
  update:async(req,res,next)=>{try{const item=await Model.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true});if(!item)return res.status(404).json({message:'Record not found'});res.json(item)}catch(e){next(e)}},
  remove:async(req,res,next)=>{try{const item=await Model.findByIdAndDelete(req.params.id);if(!item)return res.status(404).json({message:'Record not found'});res.status(204).end()}catch(e){next(e)}}
})

for(const [path,Model] of [['business-areas',BusinessArea],['products',Product],['gallery',GalleryImage]]){
  const methods=crud(Model)
  router.get(`/public/${path}`,methods.list)
  router.get(`/${path}`,auth,methods.list)
  router.post(`/${path}`,auth,methods.create)
  router.put(`/${path}/:id`,auth,methods.update)
  router.delete(`/${path}/:id`,auth,methods.remove)
}

router.get('/public/settings',async(req,res,next)=>{try{res.json(await SiteSettings.findOne().sort({updatedAt:-1})||{})}catch(e){next(e)}})
router.put('/settings',auth,async(req,res,next)=>{try{let settings=await SiteSettings.findOne();settings=settings?await SiteSettings.findByIdAndUpdate(settings._id,req.body,{new:true,runValidators:true}):await SiteSettings.create(req.body);res.json(settings)}catch(e){next(e)}})
module.exports=router
