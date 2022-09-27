import jwt from 'jsonwebtoken'

const generateToken = async() => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '5d'
    })
}

export default generateToken