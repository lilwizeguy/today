import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import NewsCard from './News';
import Navbar from './Navbar';
import NotesCard from './Notes';
import StocksCardContainer from './Stocks';
import WeatherCardContainer from './Weather';

// import news from './news';


import {getStocks, getWeather, getNews}  from './api'




class App extends Component {
  render() {
    return (
        <div className="App grey lighten-5">

          <Navbar />

          <div class="row">  
            <div class="col s12 m5">      
              <StocksCardContainer />
              <WeatherCardContainer />
              <NotesCard />
            </div>
            <div class="col s12 m7">
              <NewsCard />
            </div>
          </div>
        
        </div>

    );
  }
}

export default App;
