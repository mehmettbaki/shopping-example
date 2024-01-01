const express = require('express');
const helmet = require('helmet');
const authRoute = require('./routes/auth')
const userRoute = require('./routes/user');
const productRoute = require('./routes/product');
const orderRoute = require('./routes/order');
const cardRoute =require('./routes/card')
const { connect } = require('./db');

const app = express();
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.json('hello');
});



app.use('/auth', authRoute)
app.use('/users', userRoute);
app.use('/products', productRoute);
app.use('/orders', orderRoute);
app.use('/card', cardRoute)

app.use((req, res, next) => {
    res.status(404).json('not found');
});

app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).json(err.message || 'server error');
});

app.listen(7001, async () => {
    // connnet mysql
    await connect();
    console.log('server running');
});
