import React, { Component } from 'react';
import {Line} from 'react-chartjs-2';
import LoadingIcon from '../LoadingIcon';

import '../App.css';

import {getWeather} from './api';
import ErrorCard from '../ErrorCard';


class WeatherCard extends Component {

    componentDidMount() {

      const outerState = this;
      const {lat, lon} = this.props;

      getWeather(lat, lon, (response) => {

        const {currentWeather, timeseriesLabels, timeseriesValues} = response;
        
        outerState.setState({
          currentWeather: currentWeather,
          labels : timeseriesLabels,
          timeseries : timeseriesValues,
          isLoading : false,
          err : false,
        });
      }, (error) => {
        this.setState({
          err : true,
          isLoading : false,
        })
      });
    }

    constructor() {
      super();

      this.state = {
        isLoading : true,
        err : true,
      }

    }

    orangeColor() {
      return 'rgba(255,179,0, 1)';
    }


    render() {  

      if (this.state.isLoading) {
        return <LoadingIcon color="WEATHER"/>;
      }

      if (this.state.err) {
        const message = "Unable to display weather.  Please try again";        
        return <ErrorCard color="orange" message={message}/>;
      }

      const {currentWeather, labels, timeseries} = this.state;

      const chartData = {
        labels: labels,
        datasets: [
          {
            fill: false,
            lineTension: 0.1,
            backgroundColor: this.orangeColor(),
            borderColor: this.orangeColor(),
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
        <li class="collection-item">
          <div class="col s12 m3">
            {/* <h6 class="left-align">Cupertino</h6>  */}
            <h6 class="left-align boldStyle">{currentWeather}</h6>
          </div>
          <div class="col s12 m9">
            <Line ref={currentWeather} data={chartData} options={options} height={80}/>
          </div>
        </li>); 
    }
  }

  export default WeatherCard;
  