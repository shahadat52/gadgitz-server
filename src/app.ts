import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import router from './app/routes';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';
import auth from './app/middlewares/auth';
import { bookingCollections } from './app/modules/Booking/booking.collection';
const app: Application = express();

// middleware parsers
app.use(express.json());
app.use(cors());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello From Car Wash Server');
});

app.use('/api', router)
app.use(
  '/api/my-bookings',
  auth('user'),
  bookingCollections.getBookingById
)

app.use(globalErrorHandler);

// api not found route
app.use(notFound);

export default app;
