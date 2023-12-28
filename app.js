const express = require('express');
const helmet = require('helmet');
const  userRoute  = require('./routes/user');
const  productRoute  = require('./routes/product');
const { connect} = require('./db')


const app = express();
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// app.get('/', (req, res)=>{

// res.json('hello')
// })

app.use('/users', userRoute);
app.use('/products', productRoute)

app.use((req, res, next) => {
    res.status(404).json('not found');
});

app.use((err, req, res, next) => {
    res.status(500).json(err.message || 'server error');
});

app.listen(7001, () => {
    //connect()
    console.log('server running');
});
