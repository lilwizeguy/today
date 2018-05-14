import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class StocksCard extends Component {

  fetchStocks() {
    fetch
  }

  render() {
    return (
      <div>
        <h2>Stocks</h2>
        <div>
        </div>
      </div>
    );
  }
}

class WeatherCard extends Component {

  render() {
    return (
      <div>
        <h2>Weather</h2>
      </div>
    )
  }

}

class NewsCard extends Component {

  render() {
    return (
      <div>
        <h2>News</h2>
      </div>
    )
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">

        <StocksCard />
        <WeatherCard />
        <NewsCard />
      </div>
    );
  }
}

export default App;
