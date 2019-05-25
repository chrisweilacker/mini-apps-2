var Chart = require('chart.js');
var moment = require('moment');
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Axios from 'axios';
var chart = null;


class App extends Component{
    constructor(props) {
        super(props)
        this.state = {
            time: '1D',
            currency: 'USD',
            crypto: 'BTC'
        };
    }
    



    
    renderChart() {
        var ctx = document.getElementById('myChart');
        let serverResponse=null;
        let formatString='';
        if (this.state.time=='5Y') {
            formatString='MMMM YYYY';
            serverResponse=Axios.get('http://localhost:9001/cyrpto/daily', {
                params: {
                    fsym: this.state.crypto,
                    tsym: this.state.currency,
                    aggregate: 30,
                    limit: 61
                }
            });
        } else if (this.state.time=='1Y') {
            formatString='MMMM YYYY';
            serverResponse=Axios.get('http://localhost:9001/cyrpto/daily', {
                params: {
                    fsym: this.state.crypto,
                    tsym: this.state.currency,
                    aggregate: 31,
                    limit: 12
                }
            });
        } else if (this.state.time=='1M') {
            formatString='MMMM DD YYYY';
            serverResponse=Axios.get('http://localhost:9001/cyrpto/daily', {
                params: {
                    fsym: this.state.crypto,
                    tsym: this.state.currency,
                    aggregate: 1,
                    limit: 31
                }
            });
        } else if (this.state.time=='5D') {
            formatString='MMMM DD LT';
            serverResponse=Axios.get('http://localhost:9001/cyrpto/hourly', {
                params: {
                    fsym: this.state.crypto,
                    tsym: this.state.currency,
                    aggregate: 2,
                    limit: 60
                }
            });
        } else {
            formatString='MMMM DD YYYY LT';
            serverResponse=Axios.get('http://localhost:9001/cyrpto/minute', {
                params: {
                    fsym: this.state.crypto,
                    tsym: this.state.currency,
                    aggregate: 15,
                    limit: 96
                }
            });
        }
        serverResponse.then((response)=> {
            let sanitizedData = [];
            for (let i =0; i<response.data.length; i++) {
                let newDate = new Date(response.data[i].time*1000);
                let formattedDate = moment(newDate).format(formatString);
                sanitizedData.push({t: formattedDate, y:response.data[i].close})
            }
            console.log(sanitizedData);

            let chartColors = {
                red: 'rgb(255, 99, 132)',
                orange: 'rgb(255, 159, 64)',
                yellow: 'rgb(255, 205, 86)',
                green: 'rgb(75, 192, 192)',
                blue: 'rgb(54, 162, 235)',
                purple: 'rgb(153, 102, 255)',
                grey: 'rgb(201, 203, 207)'
            };
            
            var color = Chart.helpers.color;
            var cfg = {
                type: 'bar',
                data: {
                    datasets: [{
                        label: `${this.state.crypto} : ${this.state.currency} - ${this.state.time}`,
                        backgroundColor: color(chartColors.red).alpha(0.5).rgbString(),
                        borderColor: chartColors.red,
                        data: sanitizedData,
                        type: 'line',
                        pointRadius: 0,
                        fill: false,
                        lineTension: 0,
                        borderWidth: 2
                    }]
                },
                options: {
                    scales: {
                        xAxes: [{
                            type: 'time',
                            distribution: 'series',
                            ticks: {
                                source: 'data',
                                autoSkip: true
                            }
                        }],
                        yAxes: [{
                            scaleLabel: {
                                display: true,
                                labelString: `Price (${this.state.currency})`
                            }
                        }]
                    },
                    tooltips: {
                        intersect: false,
                        mode: 'index',
                        callbacks: {
                            label: function(tooltipItem, myData) {
                                var label = myData.datasets[tooltipItem.datasetIndex].label || '';
                                if (label) {
                                    label += ': ';
                                }
                                label += parseFloat(tooltipItem.value).toFixed(2);
                                return label;
                            }
                        }
                    }
                }
            };
            if (chart!==null) {
                chart.destroy();
            }
            chart = new Chart(ctx, cfg);

            
            

	    });
    }

    render() {
        this.renderChart();
        return( 
            <div className="row" style={{'margin-bottom':'20px'}}>
                <div className="col-6">
                    <h1>CrytoCurrency Chart</h1>
                </div>
                <div className="col-2">
                    <label for="crypto">CryptoCurrency: </label>  
                    <select class="form-control" onChange={(e)=>{this.setState({crypto: e.target.value})}} id="crypto">
                        <option value="BTC">BitCoin (BTC)</option>
                        <option value="LTC">Litecoin (LTC)</option>
                        <option value="ETH">Ethereum (ETH)</option>
                    </select>   
                </div>
                <div className="col-2">
                  <label for="currency">Fiat Currency: </label>  
                  <select class="form-control" onChange={(e)=>{this.setState({currency: e.target.value})}} id="currency">
                    <option value="USD">US Dollar (USD)</option>
                    <option value="CAD">Canadian Dollar (CAD)</option>
                    <option value="GBP">British Pound (GBP)</option>
                    <option value="EUR">Euro (EUR)</option>
                    <option value="AUD">Australian Dollar (AUD)</option>
                  </select> 
                </div>
                <div className="col-2">
                  <label for="timespan">TimeSpan: </label>  
                  <select class="form-control" onChange={(e)=>{this.setState({time: e.target.value})}} id="timespan">
                    <option value="1D">One Day</option>
                    <option value="5D">Five Days</option>
                    <option value="1M">One Month</option>
                    <option value="1Y">One Year</option>
                    <option value="5Y">Five Years</option>
                  </select> 
                </div>
                
            </div>);
    }
}

function removeData(chart) {
    chart.data.labels.pop();
    chart.data.datasets.forEach((dataset) => {
        dataset.data.pop();
    });
    chart.update();
}

ReactDOM.render(<App/>, document.getElementById('App'));