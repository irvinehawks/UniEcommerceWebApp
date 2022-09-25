import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'

// @Desc   Registering users into the application using POST http verb
// @Route  /register
// @Access Public
const registerUser = asyncHandler(async(req, res) => {
    const userExists = await User.findAll({email})

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
            id: userCreated.id,
            username: userCreated.username,
            email: userCreated.email,
            password: userCreated.password
        })
    } else{
        res.status(400)
        throw new Error('Invalid user data!!, you can not create a duplicate entry of the same user.')
    }
})

// @Desc   Authentiucating users, login functionality using POST http verb
// @Route  /login
// @Access Public
const authUser = asyncHandler(async(req, res) => {

})

// @Desc  Retrieving a list of users in the application using GET http verb
// @Route /users
// @Acess Private
const getUsers = asyncHandler(async(req, res) => {

})

// @Desc Retrieving a single user using id, GET http Verb
// @Route /user/:id
// @Acess Private
const getUserById = asyncHandler(async(req, res) => {

})

// @Desc   Updating a single user using id, PUT http Verb
// @Route  /user/:id
// @Access Public
const updateUserId = asyncHandler(async(req, res) => {

})

// @Desc   Updating user profile using PUT http Verb
// @Route  /profile
// @Access Public
const updateUserProfile = asyncHandler(async(req, res) => {

})

// @Desc   Deleting/ removing user from the application using DELETE http verb
// @Route  /user/:id
// @Access Private
const deleteUser = asyncHandler(async(req, res) => {

})