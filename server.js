const express = require('express')
require('dotenv').config()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const workout = require('./models/workoutModel')

//connect the router 
const workoutRoutes = require('./routes/workouts')

//create an express app
const app = express()

//middleware
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(express.json())
app.use((req,res,next)=>{
    console.log(req.path,req.method)
    next()
})
//routes
app.use('/api/workouts',workoutRoutes)

//connect to db
mongoose.connect(process.env.MONGO_URI)
.then(() =>{
    //listen for requests
 app.listen(process.env.PORT,()=>{
    console.log('connected to db & listening on port',process.env.PORT)
   }) 
})
.catch((error) =>{
    console.log(error)
})