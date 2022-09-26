import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
        },

        password: {
            type: String,
            required: true,
        }
    }
)

//password matching or comparing to see if enteredPassword matches this.password in the database
userSchema.methods.matchPassword = async(enteredPassword) => {
    return bcrypt.compare(enteredPassword, this.password)
}

//checking if password is not modified, if not proceed to encrypt it using (bcrypt*salt)
userSchema.pre('save', async(next) => {
    if(!this.isModified('password')) {
        next()
    }

    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

const User = mongoose.model('User', userSchema)
export default User