import React, { Component } from 'react';
import '../App.css';
import LoadingIcon from '../LoadingIcon';
import {Line} from 'react-chartjs-2';
import {getStocks, timeseriesRequest} from './api';
import ErrorCard from '../ErrorCard';

class StocksCard extends Component {

    constructor(props) {
      
      super();
      
      this.state = {
        isLoading : true,
      };
    }


    loadStocks() {
      const outerState = this;
      this.setState({
        isLoading : true,
      });
      
      timeseriesRequest(this.props.dataUrl, (timeseriesResponse)  => {
        const {timeDataChronological, labelData, symbol, price} = timeseriesResponse;
  
        outerState.setState({
          timeseries : timeDataChronological,
          labels : labelData,
          symbol : symbol,
          price : price,
          isLoading : false,
        });
      }, (error) => {
        this.setState({
          err : true,
          isLoading : false,
        })
      });  

    }
  
    componentWillMount() {

      this.loadStocks();
    }
  
    render() {
  
      if (this.state.isLoading) {
        return (<li class="collection-item heightStyle"> 
          <LoadingIcon color="STOCKS" />
          </li>);
      }
  
      if (this.state.err) {
        const message = "Unable to display stock information.  Please try again.";       
        return <ErrorCard color="black" message={message} onTryAgain={this.loadStocks.bind(this)}/>
      }

      const {symbol, price, labels, timeseries } = this.state;

      const chartData = {
        labels: labels,
        datasets: [
          {
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(117,117,117, 1)',
            borderColor: 'rgba(117,117,117, 1)',
            data : timeseries,
          },
        ],
      };
  
      const options = {
        legend: {
           display: false
           
        },
        scales : {
          yAxes: [{
            ticks: {
                beginAtZero:false,
            }
          }]
        },
        tooltips: {
           enabled: true
        },
        responsive:true,
        maintainAspectRatio: false,
      };
  
      return (
        <li class="collection-item heightStyle">   
          <div class="col s12 m3">
            <h6 class="left-align">{symbol}</h6> 
            <h6 class="left-align boldStyle" >${parseFloat(price).toFixed(2)}</h6>
          </div>
          <div class="col s12 m9">
            <Line ref={symbol} data={chartData} options={options} height={80}/>
          </div>
        </li>);
  
    }
  }
  
  export default StocksCard;