import React, { Component } from 'react';
import CardType from '../constants';

class LoadingIcon extends Component {

    colorForKeyword() {
      const key = this.props.cardType;

      let color = 'teal';
      switch(key) {
        case CardType.STOCKS:
          color = 'black';
          break;
        case CardType.WEATHER:
          color = 'orange';
          break;
        case CardType.NEWS:
          color = 'blue';
          break;
      }

      return color;
    }

    componentDidMount() {
      this.setState({
        color : this.colorForKeyword(),
      })
    }

    render() {
      const inline = {
        backgroundColor : 'lightGray',
      }

      const decorator = 'indeterminate ' + this.colorForKeyword();
      return (
        <div className="progress" style={inline}>
          <div className={decorator} ></div>
        </div>
      )
    }
  }

  export default LoadingIcon;
  