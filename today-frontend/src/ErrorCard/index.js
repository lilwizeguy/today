import React, { Component } from 'react';
import '../App.css';
import CardType from '../constants';


class ErrorCard extends Component {

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

    render() {
        const {message, onTryAgain} = this.props;

        const fullClassName = "waves-effect waves-light btn " + this.colorForKeyword();
        return (<li className="collection-item">
                <p className="left-align">{message}</p>
                <a className={fullClassName} onClick={onTryAgain}>Try Again</a>
            </li>);
    }
}

export default ErrorCard;