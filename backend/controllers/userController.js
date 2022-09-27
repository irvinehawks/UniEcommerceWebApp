import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'

//(1) @Desc   Registering users into the application using POST http verb
//    @Route  POST /api/users/
//    @Access Public
const registerUser = asyncHandler(async(req, res) => {
    const userExists = await User.findAll({ email })

    //Assigning registration form variables to req.body
    const { username, email, password } = req.body

    //checking if all registration form fields are filled before submission
    if(!username || !email || !password){
        res.status(400)
        throw new Error('Please fill all form fields.')
    }

    //checking if a user is already registered to avoid duplicate entries of the same user in the database.
    if(userExists){
        res.status(400)
        throw new Error('User already exists!')
    }

    //if user is not existing in the system, then create user
    const userCreated = await User.create({
        username,
        email,
        password
    })

    //if user is created successfully, a success message should be returned
    if(userCreated){
        res.status(201).json({
            _id: userCreated._id,
            username: userCreated.username,
            email: userCreated.email,
            password: userCreated.password
        })
    } else{
        res.status(400)
        throw new Error('Invalid user data!!, you can not create a duplicate entry of the same user.')
    }
})

//(2) @Desc   Authentiucating users, login or start session functionality using POST http verb
//    @Route  POST /api/users/login
//    @Access Public
const authUser = asyncHandler(async(req, res) => {
    const { username, email, password } = req.body
    const user = await User.find({ email })

    //if user is found, check if password entered matches the one already in the system.
    if(user &&(user.matchPassword(password, username))) {
        res.json({
            _id: user._id,
            username: user.username,
            email: user.email
        })
    } else{
        res.status(401)
        throw new Error('Invalid login credentials, Please try again with correct email or password.')
    }
})

//(3) @Desc  Retrieving a list of users in the application using GET http verb
//    @Route /api/users
//    @Acess Private
const getUsers = asyncHandler(async(req, res) => {
    const users = await User.find({})

    if(users){
        res.status(200).json(users)
    }

})

//(4) @Desc Retrieving a single user using id, GET http Verb
//    @Route /api/users/:id
//    @Acess Private
const getUserById = asyncHandler(async(req, res) => {
    const user = await User.findById(req.params._id).select('-password')

    if(user) {
        res.status(200).json(user)
    } else{
        res.status(404)
        throw new Error('User not found!!')
    }
})

//(5) @Desc   Updating a single user using id, PUT http Verb
//    @Route  PUT /api/users/:id
//    @Access Public
const updateUserId = asyncHandler(async(req, res) => {
    const user = await User.findById(req.params._id)


})

//(6) @Desc   Updating user profile using PUT http Verb
//    @Route  /api/users/profile
//    @Access Public
const updateUserProfile = asyncHandler(async(req, res) => {
    const user = await User.find(req.params._id)

    if(user) {
        user.username = req.body.username || user.username
        user.email    = req.body.email     ||user.email
        if(req.body.password) {
            user.password = req.body.password
        }

        const updatedUser = user.save()
        if(updatedUser) {
            res.json({
                _id: updatedUser._id,
                username: updatedUser.username,
                email: updatedUser.email
            })
        }
    } else{
        res.status(404)
        throw new Error('User not Found!')
    }
})

//(7) @Desc Get user profile data
//    @Desc Get /api/users/profile
//    @Desc Public
const getUserProfile = asyncHandler(async(req, res) => {
    const user = await User.findById(req.params._id)

    if(user){
        res.json({
            _id: user._id,
            username: user.username,
            email: user.email
        })
    }
})

//(8) @Desc   Deleting/ removing user from the application using DELETE http verb
//    @Route  /user/:id
//    @Access Private
const deleteUser = asyncHandler(async(req, res) => {
    const user = await User.findById(req.params._id)

    if(user) {
        await user.remove()
        res.json('User deleted successfully!')
    } else{
        res.status(404)
        throw new Error('User not found')
    }
})

export {
    registerUser,
    authUser,
    getUsers,
    getUserById,
    updateUserById,
    updateUserProfile,
    getUserProfile,
    deleteUser
}