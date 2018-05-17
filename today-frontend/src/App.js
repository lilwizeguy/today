import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import {getStocks, getWeather, getNews}  from './api'

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
    this.fetchStocks();
  }

  render() {

    if (this.state.isLoading) {
      return <h3>Stocks Loading...</h3>
    }

    const stocks = this.state.dataSource.map(value => {
      return <li>{value.symbol}</li>;
    });


    return (
      <div>
        <h2>Stocks</h2>
        <ul>
          {stocks}
        </ul>
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

  constructor(props) {
    
    super();
    
    this.state = {
      dataSource : [],
      isLoading : true,
    }
  }

  fetchNews() {
    const outer = this;
    getNews((response) => {
      console.log(response);
      outer.setState({
        dataSource : response,
        isLoading : false,
      })
    })
  }

  componentDidMount() {
    this.fetchNews();
  }

  render() {

    if (this.state.isLoading) {
      return <h3>Loading News...</h3>
    }



    const stories = this.state.dataSource.map(value => {
        return <li>{value.title}</li>;
    });

    return (
      <div>
        <h2>News</h2>
        <ul>
          {stories}
        </ul>
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
