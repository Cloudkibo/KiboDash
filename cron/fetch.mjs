require('dotenv').config()
import mongoose from 'mongoose'

mongoose.connect(process.env.DB_MONGO);
