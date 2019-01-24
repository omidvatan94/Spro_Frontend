import React, { Component } from 'react';
import MenuContainer from './MenuContainer'

class Favorites extends Component {

  render() {
    return (
      <div>
      FAVORITES
      <button onClick={(e) => this.props.goBack(e)}> Go Back </button>
      </div>
    );
  }

}

export default Favorites;
