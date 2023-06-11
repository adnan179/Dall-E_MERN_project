//requirments
import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';

//connection with mongoDB
import connectDB from './mongodb/connect.js';
//routes
import postRoutes from './routes/postRoutes.js';
import dalleRoutes from './routes/dalleRoutes.js';

dotenv.config();

const app = express();
app.use(cors());
//limiting the json response
app.use(express.json({ limit: '50mb' }));

//using the routes
app.use('/api/v1/post', postRoutes);
app.use('/api/v1/dalle', dalleRoutes);

app.get('/', async (req, res) => {
  res.status(200).json({
    message: 'Hello from DALL.E!',
  });
});

//func to connect the server to the atlas server
const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URL);
    app.listen(8080, () => console.log('Server started on port 8080'));
  } catch (error) {
    console.log(error);
  }
};

startServer();