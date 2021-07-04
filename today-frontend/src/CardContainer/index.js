import React, { Component } from 'react';
import '../App.css';
import CardType from '../constants';

class CardContainer extends Component {

    colorForKeyword() {
        const key = this.props.cardType;
  
        let color = 'teal';
        switch(key) {
          case CardType.STOCKS:
            color = 'grey';
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

        // "collection-header grey darken-1 white-text"
        const klass = "collection-header " + this.colorForKeyword() + " darken-1 white-text";

        return (
        <div>
            <ul className="collection with-header z-depth-1">
                <li class={klass}><h5 class="left-align boldStyle">{this.props.cardTitle}</h5></li>
                {this.props.cardBody}
            </ul>
        </div>
        );
    }
}

export default CardContainer;