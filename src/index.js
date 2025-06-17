import express from 'express';
import {PORT} from './config.js';
import usersRoutes from './routes/users.routes.js';    
import servicesRoutes from './routes/services.routes.js';
import employessRoutes from './routes/employees.routes.js'
import morgan from 'morgan';

const app = express();

app.use(morgan('dev'));
app.use(express.json()); 
app.use(usersRoutes);
app.use(servicesRoutes);
app.use(employessRoutes);

app.listen(PORT);
console.log('Server on port', PORT );