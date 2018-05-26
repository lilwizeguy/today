import React, { Component } from 'react';
import '../App.css';
import LoadingIcon from '../LoadingIcon';
import {Line} from 'react-chartjs-2';
import {getStocks} from '../api';

class StocksCard extends Component {

    constructor(props) {
      
      super();
      
      this.state = {
        dataSource : [],
        isLoading : true,
      };
    }
  
    fetchStocks() {
      const outer = this;
      getStocks((response) => {
        console.log(response);
        outer.setState({
          dataSource : response,
          isLoading : false,
        })
      })
    }
  
    componentWillMount() {
     // this.fetchStocks();
  
      const outerState = this;
      fetch(this.props.dataUrl).then((response)=> {
        return response.json();
      }).then((parsedJson)=> {
        parsedJson = parsedJson.data;
  
        const timeData = parsedJson.timeseries.map((val)=> {
  
          return parseFloat(val["price"]);
        });
  
        const labelData = parsedJson.timeseries.map((val)=> {
          return val["date"];
        });
  
        console.log(labelData);
  
        const timeDataChronological = timeData.reverse();
  
        outerState.setState({
          timeseries : timeDataChronological,
          labels : labelData,
          symbol : parsedJson.symbol,
          price : parsedJson.price,
          isLoading : false,
        });
      });
  
    }
  
    render() {
  
      if (this.state.isLoading) {
        return (<li class="collection-item heightStyle"> 
          <LoadingIcon />
          </li>);
      }
  
  
      var tmpLabels = [];
  
      const shaveLength = 20;
      for (let i = 0; i < shaveLength; i++) {
        tmpLabels.push("");
      }
  
      //tmpLabels = this.state.labelData;
      // console.log(tmpLabels);
  
      const chartData = {
        // labels: this.state.labels.slice(0, shaveLength),
        labels: tmpLabels,
        datasets: [
          {
         //   label: 'My First dataset',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            data : this.state.timeseries.slice(0, shaveLength),
           // data : this.state.timeseries.slice(0, 10),
          // data : [65, 100, 80, 81, 56, 55, 40],
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
                // min: 180,
                // max: 190    
            }
          }]
        },
        tooltips: {
           enabled: false
        },
        responsive:true,
        maintainAspectRatio: false,
      };
  
      const symbol = this.state.symbol;
      const price = this.state.price;
    
      return (<li class="collection-item heightStyle">   
          <div class="col s12 m3">
            <h6 class="left-align">{symbol}</h6> 
            <h6 class="left-align boldStyle" >${price}</h6>
          </div>
          <div class="col s12 m9">
            <Line ref={symbol} data={chartData} options={options} height={80}/>
          </div>
        </li>);
  
    }
  }
  
  export default StocksCard;