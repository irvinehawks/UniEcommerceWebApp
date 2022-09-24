//Importing package dependancies
import express from 'express'
//import dotenv from 'dotenv'
import morgan from 'morgan'
import colors from 'colors'
import cors from 'cors'

import connectDB from './config/db.js'

//creating express app
const app = express()

//enabling package dependancies
app.use(express.json())
app.use(express.urlencoded({ extended: true}))
app.use(cors())
colors.enable()
app.use(morgan('dev'))

//Database connection
//dotenv.config()
connectDB()

//Routing functionality


//Port and listen configurations
const PORT = process.env.PORT || 8001

app.listen(
    PORT,
    console.log(
        `Server running on http://localhost:${PORT}`.yellow.bold
    )
)

