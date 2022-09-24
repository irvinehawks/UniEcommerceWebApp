import mongoose from 'mongoose'

const connectDB = async () => {
    try {
        const conn = await mongoose.connect('mongodb+srv://irvinehawks:Irvine0153@uniecommercewebappdb.30jdjhj.mongodb.net/?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })

        console.log(`Database connected successfully :${conn.connection.host}`.cyan.bold.uderline)

        //If there is an error in connection, catch it and display its nature.
    } catch(error) {
        console.log(`Error: ${error.message}`.red.bold.unerline)
        process.exit(1)
    }
}

export default connectDB