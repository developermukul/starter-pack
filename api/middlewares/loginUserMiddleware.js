import createError from "../controllers/createError.js"
import jwt from 'jsonwebtoken'

const loginUserMiddleware = async ( req, res, next) => {
    try {
        // check token
        const token = await req.cookies.access_token
        if(!token){
            next(createError(401, 'you are not Authenticator'))
        }

        // check verify token
        const login_student = await jwt.verify(token, process.env.JWT_TOKEN)
        if(!login_student){
            next(createError(401, 'Invalid token'))
        }

        // check id 
        if(login_student.id !== req.params.id){
            next(createError(401, 'You are not able to access these features'))
        }

        if(login_student){
            req.student = login_student
            next()
        }



    } catch (error) {
        next(error)
    }
}


export default loginUserMiddleware

