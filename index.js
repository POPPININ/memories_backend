import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import postRoutes from './routes/posts.js';
import dotenv from 'dotenv';

dotenv.config()

const app = express();

// Route for all POST requests
app.use('/posts', postRoutes);

app.use(bodyParser.json({ limit : "30mb", extended : true}));
app.use(bodyParser.urlencoded({ limit : "30mb", extended : true}));
app.use(cors());

const DB_CONNECTION_URL = process.env.DB_CONNECTION_URL;

// Set to 5000 for local testing
const PORT = process.env.PORT || 5000;

mongoose.connect(DB_CONNECTION_URL, { useNewUrlParser : true, 
                 useUnifiedTopology : true })
        .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
        .catch(error => console.log(error.message));

mongoose.set('useFindAndModify', false);