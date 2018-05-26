import React, { Component } from 'react';
import '../App.css';

class WeatherCard extends Component {

    render() {  
      return (
        <li class="collection-item">
          <div class="col s12 m3">
            <h6 class="left-align">Cupertino</h6> 
            <h6 class="left-align boldStyle">100</h6>
          </div>
          <div class="col s12 m9">
            {/* <Line ref={symbol} data={chartData} options={options} height={80}/> */}
          </div>
        </li>);
  
    }
  }

  export default WeatherCard;
  