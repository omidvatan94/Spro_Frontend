import React, { Component } from "react";
import MenuButton from './MenuButton.js'
import Menu from './Menu.js'
import logo from '../logo.png'
import BeanCard from '../Beans/BeanCard'


class MenuContainer extends Component {
  constructor(props, context) {
  super(props, context);



  this.state = {
    visible: false,
    allBeans: [],
    filteredBeans: [],
    favorites: [],
    showFavorites: false,
    goBack: false
  };

  this.handleMouseDown = this.handleMouseDown.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);
  }

  handleMouseDown(e) {
    this.toggleMenu();
    e.stopPropagation();
    let roaster = e.target.name
    let newArr = [...this.state.allBeans]
    let filteredArr;
    filteredArr = this.state.allBeans
    // roaster === "All" ? this.setState({filteredBeans: this.state.beans}) : console.log(roaster)
    if(roaster === "Blue Bottle Coffee"){
      filteredArr = newArr.filter(bean => bean.roaster === "Blue Bottle Coffee")
    } else if (roaster === "City of Saints"){
      filteredArr = newArr.filter(bean => bean.roaster === "City of Saints")
    } else if (roaster === "Intelligentsia"){
      filteredArr = newArr.filter(bean => bean.roaster === "Intelligentsia")
    } else if (roaster === "La Colombe"){
      filteredArr = newArr.filter(bean => bean.roaster === "La Colombe")
    } else if (roaster === "Toby's Estate"){
      filteredArr = newArr.filter(bean => bean.roaster === "Toby's Estate")
    } else if (roaster === "Stumptown Coffee Roasters"){
      filteredArr = newArr.filter(bean => bean.roaster === "Stumptown Coffee Roasters")
    } else if (roaster === "Peet's Coffee"){
      filteredArr = newArr.filter(bean => bean.roaster === "Peet's Coffee")
    } else if (roaster === "Light"){
      filteredArr = newArr.filter(bean => bean.roast_lvl === "Light")
    } else if (roaster === "Medium"){
      filteredArr = newArr.filter(bean => bean.roast_lvl === "Medium")
    } else if (roaster === "Dark"){
      filteredArr = newArr.filter(bean => bean.roast_lvl === "Dark")
    } else if (roaster === "Latin America"){
      filteredArr = newArr.filter(bean => bean.region === "Latin America")
    } else if (roaster === "Africa") {
      filteredArr = newArr.filter(bean => bean.region === "Africa")
    } else if (roaster === "Favorites") {
      this.setState({showFavorites: !this.state.showFavorites})
    } else {
      filteredArr = this.state.allBeans
    }
    this.setState({
      filteredBeans: filteredArr
    })
  }


toggleMenu() {
  this.setState({
      visible: !this.state.visible
  });
}

componentDidMount(){
  fetch("http://localhost:3000/beans")
  .then(res => res.json())
  .then(data => {
    this.setState({
      allBeans: data,
      filteredBeans: data
    })
  })
  fetch("http://localhost:3000/favorites")
  .then(res => res.json())
  .then(data => {
    this.setState({
      favorites: data
    })
  })
}

mappedFavorites = () => {
  let newArr;
  let favs;
  let myBeanIds;
  
  let filtered;
  fetch("http://localhost:3000/favorites")
  .then(res => res.json())
  .then(data => {
    this.setState({
      favorites: data
    })
  })
  newArr = [...this.state.allBeans]
  favs = this.state.favorites.filter(favorite => favorite.user_id === 1)
  myBeanIds = favs.map(fav => fav.bean_id)
  filtered = newArr.filter(function(item) {
    return myBeanIds.indexOf(item.id) !== -1
  })
  return filtered.map(bean => <BeanCard bean={bean}/>)
}

// goBack = () => {
//   this.setState({
//     goBack: !this.state.goBack
//   })
// }


  render() {
    console.log(this.state.showFavorites)
    return (
    <div onClick={console.log}>

      <MenuButton handleMouseDown={this.handleMouseDown}/>
      <div  >
        <img alt="logo" src={logo} />
      </div>
      <Menu handleClick={this.handleChange} handleMouseDown={this.handleMouseDown}
          menuVisibility={this.state.visible}/>
      <div className="container-wrapper">
        <div className="ui grid container">
          {this.state.showFavorites ? this.mappedFavorites() : this.state.filteredBeans.map(bean => <BeanCard bean={bean} /> )}

        </div>
      </div>


    </div>
    );
  }
}

export default MenuContainer;

// return filtered.map(bean => <BeanCard bean={bean}/>)
