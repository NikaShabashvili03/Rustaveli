import 'dotenv';
import express from 'express';
import routes from './routes/index.js'
import mongoose from 'mongoose';
const app = express();
const PORT = process.env.PORT || 4000;

mongoose.connect("mongodb+srv://Giorgi:Giorgi123@rustaveli.pogst.mongodb.net/?retryWrites=true&w=majority", {
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));


app.use("/api", routes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
  