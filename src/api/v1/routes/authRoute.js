import { Router } from 'express';
import { validateSignup } from '../middlewares';
 
const authRoutes = Router();

authRoutes.post('/signup', validateSignup, signup);

export default authRoutes;