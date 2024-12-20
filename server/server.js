const express = require('express');
const mongoose = require('mongoose');
const projectRoutes = require('./routes');
const cors = require('cors');

const app = express();

app.use(express.json());

app.use(cors());

app.use('/server', projectRoutes);

mongoose.connect('mongodb://localhost:27017/projecto', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
