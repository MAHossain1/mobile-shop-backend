import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import router from './app/routes';
import notFound from './app/config/middlewares/notFound';
import globalErrorHandler from './app/config/middlewares/globalErrorHandler';
const app: Application = express();

app.use(express.json());

const corsOptions = {
  // origin: 'http://localhost:3000', // Your frontend URL
  origin: 'https://mobile-shop-frontend-gamma.vercel.app', // Your frontend URL
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'], // Allowed HTTP methods
  credentials: true, // Allow credentials like cookies and headers
};

// Use the CORS middleware with options
app.use(cors(corsOptions));

app.use('/api/v1', router);

app.use(globalErrorHandler);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello Bangladesh of the World!');
});

app.use(notFound);

export default app;
