import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import userRoutes from './routes/user';
import tabRoutes from './routes/tabs';
import { connectDB } from './db/connect';
import { config } from './modules/config/config';

const PORT = config.get("port");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/tabs', tabRoutes);


  const main = async () => {
    try {
      await connectDB();
  
      app.listen(PORT, () => {
        console.log(`server is running on port ${PORT}`);
      });
    } catch (error) {
      console.log("error connecting to db", error);
    }
  };
  
  main();