import React, { Component } from 'react';
import '../App.css';
import WeatherCard from './WeatherCard';
import LoadingIcon from '../LoadingIcon';

class WeatherCardContainer extends Component {

    constructor() {
      super();
     
      this.state = {
        hasLocation : false,
        lat : 0,
        lon : 0,
      }
    }
  
    componentWillMount() {
  
      const outerState = this;
  
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
         
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
  
          outerState.setState({
            hasLocation : true,
            lat : lat,
            lon : lon,
          });
  
        });
      }
  
    }
  
    render() {
  
      const boldStyle = {
        fontWeight : "bold",
      };
  
      var body = <LoadingIcon color="WEATHER" />
  
      if (this.state.hasLocation) {
        body = <WeatherCard lat={this.state.lat} lon={this.state.lon} />
      }
      
      return (
        <div>
          <ul class="collection with-header z-depth-1">
            <li class="collection-header"><h5 class="left-align boldStyle">Weather</h5></li>
            {body}
          </ul>
        </div>
      )
    }
  
  }

  export default WeatherCardContainer;