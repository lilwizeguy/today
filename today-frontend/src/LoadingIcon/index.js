import React, { Component } from 'react';
import CardType from '../constants';

class LoadingIcon extends Component {

    colorForKeyword() {
      const key = this.props.color;

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

    constructor() {
      super();
      this.state = {
        color : 'teal',
      }
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

      const decorator = 'indeterminate ' + this.state.color;
      return (
        <div className="progress" style={inline}>
          <div className={decorator} ></div>
        </div>
      )
    }
  }

  export default LoadingIcon;
  