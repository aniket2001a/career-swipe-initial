process.on('uncaughtException', err => {
    console.log('UNCAUGHT EXCEPTION! Shutting down...');
    console.log(err);
    process.exit(1);
});

const dotenv = require('dotenv');
dotenv.config({path: './.env'});
const mongoose = require('mongoose');
const DB_URL = process.env.DB_URL;
const app = require('./app');

mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true, 
    useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('DB connected...');
});


const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));

process.on('unhandledRejection', err => {
    console.log('UNHANDLED REJECTION! Shutting down...');
    console.log(err);
    server.close(() => {
        process.exit(1);
    });
});