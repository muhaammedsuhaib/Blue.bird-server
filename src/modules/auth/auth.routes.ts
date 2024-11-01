import express from 'express';
import tryCatch from '../../middleware/try_catch';
import { login, registration } from './auth.controllers';
import validate from '../../middleware/validate';
import { login_validation, user_validation } from './auth.validation';



const router = express.Router();

router.post('/register',validate(user_validation), tryCatch(registration));
router.post('/login',validate(login_validation), tryCatch(login));

export default router;
