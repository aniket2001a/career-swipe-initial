const express = require('express');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const userRouter = require('./routes/userRoute');

const app = express();

app.use(express.json());

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    console.log(req.headers);

    next();
})

app.use('/api/v1/user', userRouter);

// Handle the unhandled Routes
app.all('*', (req, res, next) => {
    // res.status(404).json({
    //     status: 'fail',
    //     message: `Can't find ${req.originalUrl} on this server!`
    // });

    // const err = new Error(`Can't find ${req.originalUrl} on this server!`);
    // err.status = 'fail';
    // err.statusCode = 404;

    // next(err);

    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Error Handling Middleware
app.use(globalErrorHandler);

module.exports = app;