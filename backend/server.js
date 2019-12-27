const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
});

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database - connection established");
})

const taskRouter = require('./routes/task');
const userRouter = require('./routes/users');

app.use('/tasks', taskRouter);
app.use('/users', userRouter);

app.listen(port, () => {
    console.log('Server is running on port: ' + port);
});