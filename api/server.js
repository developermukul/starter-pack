import express from 'express'
import colors from 'colors'
import dotenv from 'dotenv'
import connectMongoDB from './config/db.js'
import studentRoute from './routes/studentRoute.js'
import errorHandler from './middlewares/errorHandler.js'
import cookieParser from 'cookie-parser'


// express init
const app = express()
dotenv.config()
app.use( cookieParser() )


// middleware url uncoded
app.use(express.json())
app.use(express.urlencoded({extended:false}))



// route init from routes folder
app.use('/api/student', studentRoute)


// error Handler init
app.use( errorHandler )


//server listen
const PORT = process.env.SERVER_PORT
app.listen(PORT, () => {
    // mongo DB connect 
    connectMongoDB()
    console.log(`our server is running on port ${PORT}`.bgBlue);
})