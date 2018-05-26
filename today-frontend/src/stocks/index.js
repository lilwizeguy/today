import React, { Component } from 'react';
import '../App.css';
import StocksCard from './StocksCard';

class StocksCardContainer extends Component {

  constructor() {
    super();

    this.state = {
      dataSource : [],
    };
  }

  componentDidMount() {
    this.getStockUrls();
  }

  getStockUrls() {
    const stocks = ['AAPL', 'GOOG', 'FB'];

    const urls = stocks.map((val)=> {
      return 'http://localhost:5000/api/stocks/daily/' + val;
    });

    this.setState({
      dataSource : urls,
    });

  }

  render() {

    const stocks = this.state.dataSource.map((url) => {
        return <StocksCard dataUrl={url} />
    }); 

    return (<div>
        <ul class="collection with-header z-depth-1">
            <li class="collection-header"><h5 class="left-align boldStyle">Stocks</h5></li>
            {stocks}
        </ul>
      </div>);
  }
}

export default StocksCardContainer;