require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT;
const cors = require('cors'); //! <--necessary for frontend


//!Imports
const { dbConnect } = require('./dbConnect');
const { userController, taskController, receiptController } = require('./controllers');


//!Middleware
app.use(express.json());
app.use(cors()); //! <---necessary for front end



//!Controllers
app.use('/user', userController);
app.use('/tasks', taskController);
app.use('/receipt', receiptController);




//!Server connection

const server = async () => {
    dbConnect();

    app.listen(PORT, () => console.log(`Server on port ${PORT}`));
}

server();