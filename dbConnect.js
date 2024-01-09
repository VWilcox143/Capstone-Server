const mongoose = require('mongoose');
const connection = process.env.DB
const collection = process.env.COLL
const dbConnect = async () => {
    try{
        
        mongoose.set(`strictQuery`, true);

        await mongoose.connect(`${connection}/${collection}`);

        console.log(`DB Connected to: ${connection}/${collection}`);
    } catch (err){
        throw new Error(`DB connection Error: ${err.message}`);
    }
}

module.exports = { dbConnect, mongoose};