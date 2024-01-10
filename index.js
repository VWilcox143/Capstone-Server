require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT;

//!Imports
const { dbConnect } = require('./dbConnect');
const { userController, taskController } = require('./controllers');


//!Middleware
app.use(express.json());



//!Controllers
app.use('/user', userController);
app.use('./task', taskController);



//!Server connection

const server = async () => {
    dbConnect();

    app.listen(PORT, () => console.log(`Server on port ${PORT}`));
}

server();