import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import { env } from './config/env';
import healthRouter from './routes/health.route';
import productRouter from './routes/product.routes';
import { errorHandler } from './middleware/errorHandler';
import { notFoundHandler } from './middleware/notFoundHandler';

const app = express();

// Global Middlewares
app.use(helmet());
app.use(morgan(env.NODE_ENV === 'development' ? 'dev' : 'combined'));

// Configure CORS
app.use(cors({
  origin: env.CORS_ORIGIN,
  credentials: true,
}));

// Request Parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// API Routes
app.use('/api', healthRouter);
app.use('/api/products', productRouter);

// Not Found Route Handler
app.use(notFoundHandler);

// Global Error Handler
app.use(errorHandler);

export default app;
