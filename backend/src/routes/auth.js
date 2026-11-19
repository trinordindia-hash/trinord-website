const router=require('express').Router()
const jwt=require('jsonwebtoken')
const {body,validationResult}=require('express-validator')
const Admin=require('../models/Admin')

router.post('/login',[
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({min:8})
],async(req,res,next)=>{
  try{
    const errors=validationResult(req)
    if(!errors.isEmpty())return res.status(400).json({message:'Invalid credentials',errors:errors.array()})
    const admin=await Admin.findOne({email:req.body.email}).select('+passwordHash')
    if(!admin||!(await admin.comparePassword(req.body.password)))return res.status(401).json({message:'Invalid credentials'})
    const token=jwt.sign({sub:admin._id,role:admin.role},process.env.JWT_SECRET||'development-only-change-me',{expiresIn:'8h'})
    res.json({token,admin:{name:admin.name,email:admin.email}})
  }catch(error){next(error)}
})
module.exports=router
