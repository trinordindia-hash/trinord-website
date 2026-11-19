const jwt=require('jsonwebtoken')

module.exports=function auth(req,res,next){
  const header=req.headers.authorization||''
  const token=header.startsWith('Bearer ')&&header.slice(7)
  if(!token)return res.status(401).json({message:'Authentication required'})
  try{
    req.admin=jwt.verify(token,process.env.JWT_SECRET||'development-only-change-me')
    next()
  }catch{res.status(401).json({message:'Invalid or expired token'})}
}
