import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import morgan from 'morgan'
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import connectDB from './config/db.js';

import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';

//The below line of code initiates the express application by assigning the app variable to it.
const app = express();

//To use the dotenv package 
dotenv.config();

//To connect to the database by executing the connection code in the config directory
connectDB();

//Use morgan only if the project is on development mode
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

//To allow using color package
colors.enable();

//To allow express to use json as data exchange format
app.use(express.json())

//To allow the server to use imported routes 
app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/upload', uploadRoutes)

//Fetching paypal API for payment intergration, API key is in the .env file.
app.get('/api/config/paypal', (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
)

const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')))

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  )
} else {
  app.get('/', (req, res) => {
    res.send('API is running....')
  })
}

//Error handling
app.use(notFound)
app.use(errorHandler)

//Setup the port for the app and bind it to the .env file
const PORT = process.env.PORT || 5000

//Setup server listenig event on a dynamic port
app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
)