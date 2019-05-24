var Chart = require('chart.js')
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Axios from 'axios';

class App extends Component{
    constructor(props) {
        super(props)
        this.state = {
            time: '1D',
            currency: '5D',
            crypto: 'BTC'
        };
    }
    
    renderChart() {
        var ctx = document.getElementById('myChart');
        let serverResponse=null;
        if (this.state.time=='5Y') {
            Axios.get('http://localhost:9001/cyrpto/daily')
        } else if (this.state.time=='1Y') {
            Axios.get('http://localhost:9001/cyrpto/daily')
        } else if (this.state.time=='1M') {
            Axios.get('http://localhost:9001/cyrpto/hourly')
        } else if (this.state.time=='5D') {
            Axios.get('http://localhost:9001/cyrpto/hourly')
        } else {
            Axios.get('http://localhost:9001/cyrpto/hourly')
        }
        serverResponse.then((response)=> {
            console.log(response.data);
        })
        //get default start data and create a chart
        var myChart = new Chart(ctx, {

        });
    }

    render() {
        //this.renderChart();
        return( 
            <div className="row">
                <div className="col-6">
                    <h1>CrytoCurrency Timeline Chart</h1>
                </div>
                <div className="col-2">
                    <label for="crypto">CryptoCurrency: </label>  
                    <select class="form-control" onChange={(e)=>{this.setState({crypto: e.target.value})}} id="crypto">
                        <option selected value="BTC">BitCoin (BTC)</option>
                        <option value="LTC">Litecoin (LTC)</option>
                        <option value="ETH">Ethereum (ETH)</option>
                    </select>   
                </div>
                <div className="col-2">
                  <label for="currency">Fiat Currency: </label>  
                  <select class="form-control" onChange={(e)=>{this.setState({currency: e.target.value})}} id="currency">
                    <option selected value="USD">US Dollar (USD)</option>
                    <option value="CAD">Canadian Dollar (CAD)</option>
                    <option value="GBP">British Pound (GBP)</option>
                    <option value="EUR">Euro (EUR)</option>
                    <option value="AUD">Australian Dollar (AUD)</option>
                  </select> 
                </div>
                <div className="col-2">
                  <label for="timespan">TimeSpan: </label>  
                  <select class="form-control" onChange={(e)=>{this.setState({time: e.target.value})}} id="timespan">
                    <option selected value="1D">One Day</option>
                    <option value="5D">Five Days</option>
                    <option value="1M">One Month</option>
                    <option value="1Y">One Year</option>
                    <option value="5Y">Five Years</option>
                  </select> 
                </div>
                
            </div>);
    }
}

ReactDOM.render(<App/>, document.getElementById('App'));