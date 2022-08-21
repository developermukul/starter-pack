import express from 'express'
const router = express.Router()

import { createStudent, deleteStudent, getAllStudent, getSingleStudent, studentLogin, studentRegister, updateStudent } from '../controllers/studentController.js'
import adminMiddleware from '../middlewares/adminMiddleware.js'
import authMiddleware from '../middlewares/authMiddleware.js'
import loginUserMiddleware from '../middlewares/loginUserMiddleware.js'


// rest api route
router.route('/').get( authMiddleware, getAllStudent ).post( createStudent )
router.route('/:id').get( adminMiddleware, getSingleStudent ).put( adminMiddleware, updateStudent ).patch( adminMiddleware, updateStudent ).delete( adminMiddleware, deleteStudent )


// auth route
router.post('/login', studentLogin)
router.post('/register', studentRegister )


export default router