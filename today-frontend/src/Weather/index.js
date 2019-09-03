import React, { Component } from 'react';
import '../App.css';

import CardContainer from '../CardContainer';
import ErrorCard from '../ErrorCard';
import LoadingIcon from '../LoadingIcon';
import WeatherCard from './WeatherCard';
import CardType from '../constants';

class WeatherCardContainer extends Component {

    constructor() {
      super();
     
      this.state = {
        hasLocation : false,
        permissionDenied : false,
        lat : 0,
        lon : 0,
      }
    }

    loadWeather() {
      const outerState = this;

      outerState.setState({
        hasLocation : false,
        permissionDenied : false,
      })
  
      const geolocation = navigator.geolocation;
      
      geolocation.getCurrentPosition((position) => {
        
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        
        outerState.setState({
          permissionDenied : false,
          hasLocation : true,
          lat : lat,
          lon : lon,
        });

      },(err) => {
        outerState.setState({
          permissionDenied : true,
          hasLocation : false,
        })
      });
    }
  
    componentWillMount() { 
      this.loadWeather();      
    }
  
    render() {
      var body = <LoadingIcon color="WEATHER" />
  
      if (this.state.permissionDenied) {
        const message = "Unable to display weather.  "
        + "Please try again or change the location preferences in your browser.";
        body = <ErrorCard cardType={CardType.WEATHER} message={message} onTryAgain={this.loadWeather.bind(this)}/>
      }
      else if (this.state.hasLocation) {
        body = <WeatherCard lat={this.state.lat} lon={this.state.lon} />
      }
      
      return (
        <CardContainer cardTitle="Weather" cardBody={body} cardType={CardType.WEATHER}/>);
    }
  }

  export default WeatherCardContainer;