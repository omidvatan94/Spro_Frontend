import React, { Component } from 'react';
import StarRatingComponent from 'react-star-rating-component';
import { Link } from 'react-router-dom'
import { Switch, Route} from 'react-router-dom';
import MenuContainer from './MenuContainer'
import MapContainer from './MapContainer'


class BeanDisplay extends Component {

  state = {
    showDisplay: true,
    comment: "",
    rating: this.props.bean.rating,
    bean: {},
    showMap: false
  }

  onStarClick = (nextValue, prevValue, name) => {
    this.setState({rating: nextValue});
  }

  addFavorite = () => {
    fetch('http://localhost:3000/favorites', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({user_id: 1, bean_id: this.props.bean.id})
    })
    this.setState({
      showDisplay: !this.state.showDisplay
    })
  }

  rate = () => {
    let beanId;
    let newRating;
    newRating = this.state.rating
    beanId = this.props.bean.id
    fetch(`http://localhost:3000/beans/${beanId}`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({name: this.props.bean.name, img_url: this.props.bean.img_url, roaster: this.props.bean.roaster, roast_lvl: this.props.bean.roast_lvl, region: this.props.bean.region, description: this.props.bean.description, rating: newRating, reviews: this.props.bean.reviews})
    })
    this.setState({
      showDisplay: !this.state.showDisplay
    })
  }

  // addReview = (e, state) => {
  //   e.preventDefault();
  //   let beanId;
  //   let content;
  //   let prevContent;
  //   let newContent;
  //   beanId = this.props.bean.id
  //   content = state
  //   prevContent = [this.props.bean.reviews]
  //   newContent = prevContent.push(content)
  //   console.log(prevContent)
  //   fetch(`http://localhost:3000/beans/${beanId}`, {
  //     method: "PUT",
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({name: this.props.bean.name, img_url: this.props.bean.img_url, roaster: this.props.bean.roaster, roast_lvl: this.props.bean.roast_lvl, region: this.props.bean.region, description: this.props.bean.description, rating: this.props.bean.rating, reviews: prevContent})
  //   })
  //   this.setState({
  //     comment: ""
  //   })
  // }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleMap = (e) => {
    this.setState({
      showMap: !this.state.showMap,
      showDisplay: !this.state.showDisplay
    })
  }

  hideMap = (e) => {
    this.setState({
      showMap: !this.state.showMap
    })
  }

  // mappedReviews = () => {
  //
  // }

  showingDisplay = () => {
    const { rating } = this.state.rating;
    return (
      <div className="fixedElement">
      <button id="button1" onClick={(e) => this.props.goBack(e)} type="button">Go Back</button>
      <button id="button2" onClick={this.addFavorite} type="button">Add to Favorites</button>
      <br></br>
      <button id="button3" onClick={(e) => this.handleMap(e)} type="button">Find Cafe</button>
      <br></br>      <br></br>

        <img alt="bean" height="325" width="325" src={this.props.bean.img_url}/>
        <p>{this.props.bean.description}</p>
        <StarRatingComponent
          name="rate1"
          starCount={10}
          value={this.state.rating}
          onStarClick={this.onStarClick.bind(this)}
          starColor={`#000000`}
          emptyStarColor={`#c1c1c1`}
        />
        <br></br>
        <button id="button3" onClick={this.rate} type="button">Rate</button>
      </div>
    )
  }

  componentDidMount(){
    let beanId;
    beanId = this.props.bean.id
    fetch(`http://localhost:3000/beans/${beanId}`)
    .then(res => res.json())
    .then(data => {
      this.setState({
        bean: data
      })
    })
  }

  // showingAllBeans = () => {
  //   return (
  //     <div>
  //       <BeanParent user={this.props.user}/>
  //     </div>
  //   )
  // }


  render() {
    console.log(this.props.bean.id)
    return (
      <div>
        {this.state.showDisplay ? this.showingDisplay() : null}
        {this.state.showMap ? <MapContainer hideMap={this.hideMap} bean={this.props.bean}/> : null}
      </div>
    );
  }

}
 //<button onClick={this.addFavorite}>Add to Favorites</button>
export default BeanDisplay;
