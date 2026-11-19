require('dotenv').config()
const express=require('express')
const mongoose=require('mongoose')
const helmet=require('helmet')
const cors=require('cors')
const morgan=require('morgan')

const app=express()
const allowedOrigins=(process.env.CORS_ORIGINS||'http://localhost:5173').split(',').map(v=>v.trim())
app.use(helmet())
app.use(cors({origin(origin,callback){if(!origin||allowedOrigins.includes(origin)||allowedOrigins.includes('*'))return callback(null,true);callback(new Error('Origin not allowed by CORS'))},credentials:true}))
app.use(express.json({limit:'1mb'}))
app.use(morgan(process.env.NODE_ENV==='production'?'combined':'dev'))

app.use('/api/auth',require('./routes/auth'))
app.use('/api/enquiries',require('./routes/enquiries'))
app.use('/api/content',require('./routes/content'))

app.get('/api/health',(req,res)=>res.json({status:'ok'}))
app.use((req,res)=>res.status(404).json({message:'API route not found'}))
app.use((error,req,res,next)=>{
  if(error.name==='ValidationError')return res.status(400).json({message:error.message})
  if(error.name==='MongoServerError'&&error.code===11000)return res.status(409).json({message:'Duplicate record'})
  console.error(error)
  res.status(error.status||500).json({message:error.message||'Internal server error'})
})

async function start(){
  if(!process.env.MONGODB_URI)throw new Error('MONGODB_URI is required')
  await mongoose.connect(process.env.MONGODB_URI)
  const port=Number(process.env.PORT||4000)
  app.listen(port,()=>console.log(`Trinord API listening on port ${port}`))
}

if(require.main===module)start().catch(error=>{console.error(error.message);process.exit(1)})
module.exports={app,start}
