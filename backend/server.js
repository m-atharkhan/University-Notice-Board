import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import userRoutes from './routes/userRoutes.js';
import noticeRoutes from './routes/noticeRoutes.js';
import connectDB from './utils/config.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/notices', noticeRoutes);

app.listen(process.env.PORT, () => {
  console.log(`App listening on PORT : ${process.env.PORT}`);
  connectDB();
})