var express = require('express');
var app = express();
var cache = {};

app.use(express.static('public'))

app.get('/cyrpto/daily', (req,res)=>{
//https://min-api.cryptocompare.com/data/histoday?fsym=BTC&tsym=USD&limit=10
})

app.get('/cyrpto/hourly', (req,res)=>{
//https://min-api.cryptocompare.com/data/histohour?fsym=BTC&tsym=USD&limit=10
})

app.get('/cyrpto/minute', (req,res)=>{
//https://min-api.cryptocompare.com/data/histominute?fsym=BTC&tsym=GBP&limit=10
})

app.listen(9001, ()=>{
    console.log('listening on port 9001');
});

