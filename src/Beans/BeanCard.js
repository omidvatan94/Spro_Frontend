import React, { Component } from 'react';
import BeanDisplay from './BeanDisplay'

// import { Link } from 'react-router-dom'



class BeanCard extends Component {

  state = {
    showDisplay: false
  }

  handleClick = () => {
    this.setState({showDisplay: !this.state.showDisplay})
  }

  goBack = (e) => {
    this.setState({
      showDisplay: !this.state.showDisplay
    })
  }

  render() {
    return (
      <div className="ui eight wide column">
      <div className="bean-display">
        {this.state.showDisplay ? <BeanDisplay goBack={this.goBack} user={this.props.user} bean={this.props.bean}/> : null}
      </div>
        <div className="pigTile" onClick={() => this.handleClick(this.props.bean)}>
        <img alt="bean" height="200" width="200" src={this.props.bean.img_url} />
        <h3>{this.props.bean.name}</h3>
        <div className="roaster-card">
        <h6>{this.props.bean.roaster}</h6>
        </div>
        </div>
      </div>
    );
  }

}

export default BeanCard;
