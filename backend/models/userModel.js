import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
)

//Matching passwords during login or authentication process
userSchema.methods.matchPassword = async (enteredPassword) => {
  return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.pre('save', async (next) => {
  if (!this.isModified('password')) {
    next()
  }

//hashing and salting user password
 const salt = await bcrypt.genSalt(10)
 this.password = await bcrypt.hash(this.password, salt)
})

const User = mongoose.model('User', userSchema)

export default User