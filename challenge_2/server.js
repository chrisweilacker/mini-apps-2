var express = require('express');
var app = express();
var Axios = require('axios');
var bodyParser = require('body-parser')
var api = require('./config.js').apikey;
var cache = {};

app.use(express.static('public'));
app.use(bodyParser.json());

app.get('/cyrpto/daily', (req,res)=>{
//https://min-api.cryptocompare.com/data/histoday?fsym=BTC&tsym=USD&limit=10
Axios.get(`https://min-api.cryptocompare.com/data/histoday?fsym=${req.query.fsym}&tsym=${req.query.tsym}&aggregate=${req.query.aggregate}&limit=${req.query.limit}`, {
    headers: {
        'Apikey': api
    }
})
.then((response)=>{
    res.send(response.data.Data);
});
})

app.get('/cyrpto/hourly', (req,res)=>{
//https://min-api.cryptocompare.com/data/histohour?fsym=BTC&tsym=USD&limit=10
Axios.get(`https://min-api.cryptocompare.com/data/histohour?fsym=${req.query.fsym}&tsym=${req.query.tsym}&aggregate=${req.query.aggregate}&limit=${req.query.limit}`, {
    headers: {
        'Apikey': api
    }
})
.then((response)=>{
    res.send(response.data.Data);
});
})

app.get('/cyrpto/minute', (req,res)=>{
    console.log(req.originalUrl);
    console.log(req.query.fsym);
    Axios.get(`https://min-api.cryptocompare.com/data/histominute?fsym=${req.query.fsym}&tsym=${req.query.tsym}&aggregate=${req.query.aggregate}&limit=${req.query.limit}`, {
        headers: {
            'Apikey': api
        }
    })
    .then((response)=>{
        res.send(response.data.Data);
    });
});

app.listen(9001, ()=>{
    console.log('listening on port 9001');
});

