import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './utils//db';
import { createApp } from './utils/create-app';

dotenv.config();

const app = express();
app.use(express.json());

const db = connectDB();

createApp(db)
