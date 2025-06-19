import { Router } from 'express';
import { getEmployees, getOneEmployee, createEmployee, deleteEmployee, updateEmployee} from '../controllers/employees.controllers.js';
import { authMiddleware, authorizeRoles } from "../middlewares/authJwt.js";

const router = Router();

router.get('/employees',authMiddleware, authorizeRoles(1), getEmployees);                  
router.get('/employees/:idemployee', authMiddleware, authorizeRoles(1), getOneEmployee);    
router.post('/employees',authMiddleware, authorizeRoles(1), createEmployee);               
router.delete('/employees/:idemployee',authMiddleware, authorizeRoles(1), deleteEmployee);  
router.put('/employees/:idemployee',authMiddleware, authorizeRoles(1), updateEmployee); 

export default router;