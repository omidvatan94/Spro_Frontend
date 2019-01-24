import React, { Component } from "react";
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';



export class MapContainer extends Component {
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
    coffeeshops: [],
    filteredCoffeeshops: []
  };

  componentDidMount(){
    let newArr;
    fetch("http://localhost:3000/coffeeshops")
    .then(res => res.json())
    .then(data => {
      this.setState({
        coffeeshops: data,
        filteredCoffeeshops: data
      })
    })
    newArr = this.state.coffeeshops
    newArr.filter(shop => shop.roaster === this.props.bean.roaster)
    this.setState({
      filteredCoffeeshops: newArr
    })
  }

  // mapCoffeeshops(){
  //   let newArr;
  //   newArr = this.state.coffeeshops
  //   newArr.filter(shop => shop.roaster === this.props.bean.roaster)
  //   this.setState({
  //     filteredCoffeeshops: newArr
  //   })
  // }

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: !this.state.showingInfoWindow
    });

  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  };

  mappedMarkers = () => {
    let newArr;
    newArr = this.state.coffeeshops
    newArr = newArr.filter(shop => shop.roaster === this.props.bean.roaster)
    return newArr.map(shop => <Marker position={{lat: shop.lat, lng: shop.lon}} onClick={this.onMarkerClick} name={ <div className="infobox"> <p>{shop.name}</p> <p>{shop.address}</p> </div>} />)
  }




  render() {
    const style = {
  width: '100%',
  height: '100%',
  zoom: '75%'
}
    return (
    <div className="map" >
      <Map google={this.props.google}
          onClick={this.onMapClicked}
          style={style}
          initialCenter={{
            lat: 40.746167,
            lng: -73.949217
          }}>
        {this.mappedMarkers()}
        <InfoWindow
          onOpen={this.windowHasOpened}
          onClose={this.windowHasClosed}
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}>
            <div>
              <h1>{this.state.selectedPlace.name}</h1>
            </div>
        </InfoWindow>
      </Map>
      <div className="button">
      <button onClick={(e) => this.props.hideMap()}>Go Back</button>
      </div>
    </div>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: ("AIzaSyCHO_hzvgam-kkdBuvkCSjHiJFdC7srOaM")
})(MapContainer)




// <InfoWindow onClose={this.onInfoWindowClose}>
//     <div>
//       <h1>{this.state.selectedPlace.name}</h1>
//     </div>
// </InfoWindow>

// initialCenter={{
//   lat: 40.739513,
//   lng: -73.927803
// }}

// let newArr;
// let filteredArr;
// newArr = this.state.coffeeshops
// filteredArr = newArr.filter(shop => shop.roaster === this.props.bean.roaster)
// console.log(this.state.coffeeshops)
