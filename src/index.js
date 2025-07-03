import express from 'express';
import {PORT} from './config.js';
import usersRoutes from './routes/users.routes.js';    
import servicesRoutes from './routes/services.routes.js';
import employessRoutes from './routes/employees.routes.js'
import morgan from 'morgan';
import { errorHandler } from './middlewares/errorHandler.js';
import loginRoutes from './routes/login.routes.js';
import reservationRoutes from './routes/reservation.routes.js';
import cors from 'cors';
import 'dotenv/config';

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json()); 

app.use(usersRoutes);
app.use(servicesRoutes);
app.use(employessRoutes);
app.use(loginRoutes); 
app.use(reservationRoutes);

app.use((err, req, res, next) => {
    errorHandler(err, req, res, next);
});

app.listen(PORT);
console.log('Server on port', PORT );