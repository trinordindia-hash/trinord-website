const router=require('express').Router()
const rateLimit=require('express-rate-limit')
const {body,validationResult}=require('express-validator')
const Enquiry=require('../models/ContactEnquiry')
const auth=require('../middleware/auth')

router.post('/',rateLimit({windowMs:15*60*1000,max:5,standardHeaders:true,legacyHeaders:false}),[
  body('name').trim().isLength({min:2,max:100}),
  body('phone').trim().matches(/^[0-9+\s()-]{7,20}$/),
  body('email').optional({checkFalsy:true}).isEmail().normalizeEmail(),
  body('subject').trim().isLength({min:2,max:180}),
  body('message').trim().isLength({min:10,max:3000})
],async(req,res,next)=>{
  try{
    const errors=validationResult(req)
    if(!errors.isEmpty())return res.status(400).json({message:'Please check the submitted fields',errors:errors.array()})
    const enquiry=await Enquiry.create(req.body)
    res.status(201).json({message:'Enquiry submitted',id:enquiry._id})
  }catch(error){next(error)}
})
router.get('/',auth,async(req,res,next)=>{try{res.json(await Enquiry.find().sort({createdAt:-1}).limit(200))}catch(e){next(e)}})
router.patch('/:id/read',auth,async(req,res,next)=>{try{const e=await Enquiry.findByIdAndUpdate(req.params.id,{isRead:req.body.isRead!==false},{new:true});if(!e)return res.status(404).json({message:'Enquiry not found'});res.json(e)}catch(error){next(error)}})
module.exports=router
