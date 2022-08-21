
import Student from '../models/studentModel.js'
import bcrypt from 'bcrypt'
import createError from './createError.js'
import jwt from 'jsonwebtoken'

/**
 * @access public
 * @route /api/student
 * @method GET
 */


export const getAllStudent = async (req, res, next) => {
    try {
        const student = await Student.find()
        res.status(200).json(student)
    } catch (error) {
        next( error)
    }
}



/**
 * @access public
 * @route /api/student/:id
 * @method GET
 */


export const getSingleStudent = async (req, res, next) => {
    try {
        const student = await Student.findById(req.params.id)
        res.status(200).json(student)
    } catch (error) {
        next( error)
    }
}




/**
 * @access public
 * @route /api/student
 * @method POST
 */


export const createStudent = async (req, res, next) => {
    // salt password
    const salt = await bcrypt.genSalt(10)
    const hash_password = await bcrypt.hash(req.body.password, salt)
    try {
        const student = await Student.create({...req.body, password : hash_password})
        res.status(200).json(student)
    } catch (error) {
        next( error)
    }
}




/**
 * @access public
 * @route /api/student
 * @method PUT/PATCH
 */


export const updateStudent = async (req, res, next) => {
    try {
        const student = await Student.findByIdAndUpdate(req.params.id, req.body, {new : true})
        res.status(200).json(student)
    } catch (error) {
        next( error)
    }
}


/**
 * @access public
 * @route /api/student
 * @method DELETE
 */


export const deleteStudent = async (req, res, next) => {
    try {
        const student = await Student.findByIdAndDelete(req.params.id)
        res.status(200).json(student)
    } catch (error) {
        next( error)
    }
}








/**
 * @access public
 * @route /api/student/login
 * @method POST
 */


 export const studentLogin = async (req, res, next) => {
   try {

        // check email and exists email
        const student_login = await Student.findOne({email : req.body.email})
        if(!student_login){
            next(createError(404, 'Invalid Email'))
        }

        // check password
        const check_password = await bcrypt.compare(req.body.password, student_login.password)
        if(!check_password){
            next(createError(404, 'wrong password'))
        }

        // create token 
        const token = await jwt.sign({id : student_login.id, isAdmin : student_login.isAdmin}, process.env.JWT_TOKEN)

        // exclude password
        const { password, ...login_info } = student_login._doc

        // 

        res.cookie('access_token', token).status(200).json({
            token   : token,
            user    : login_info
        })

   } catch (error) {
        next(error)
   }
}




/**
 * @access public
 * @route /api/student/register
 * @method POST
 */


 export const studentRegister = async (req, res, next) => {
    // salt password
    const salt = await bcrypt.genSalt(10)
    const hash_password = await bcrypt.hash(req.body.password, salt)
    try {
        const student = await Student.create({...req.body, password : hash_password})
        res.status(200).json(student)
    } catch (error) {
        next( error)
    }
}


