import React, { Component } from 'react';
import '../App.css';
import StocksCard from './StocksCard';
import CardContainer from '../CardContainer'
import {getStockUrls} from './api';
import CardType from '../constants';

class StocksCardContainer extends Component {

  constructor() {
    super();

    this.state = {
      dataSource : [],
    };
  }

  componentDidMount() {
    const urls = getStockUrls();

    this.setState({
      dataSource : urls,
    });
  }

  render() {

    const stocks = this.state.dataSource.map((url) => {
        return <StocksCard key={url} dataUrl={url} />
    }); 

    return (
      <CardContainer cardTitle="Stocks" cardBody={stocks} cardType={CardType.STOCKS} />
      );
  }
}

export default StocksCardContainer;