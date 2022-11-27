import express from 'express';
import morgan from 'morgan';
import authRoutes from './routes/auth.routes.js';
import profileRoutes from './routes/profile.routes.js'
const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(authRoutes);
app.use(profileRoutes);

export default app;