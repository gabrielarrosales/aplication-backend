import { Router } from 'express';
import { getEmployees, getOneEmployee, createEmployee, deleteEmployee, updateEmployee} from '../controllers/employees.controllers.js';

const router = Router();

router.get('/employees', getEmployees);                  
router.get('/employees/:idemployee', getOneEmployee);    
router.post('/employees', createEmployee);               
router.delete('/employees/:idemployee', deleteEmployee);  
router.put('/employees/:idemployee', updateEmployee); 

export default router;