import React, { Component } from "react";
import "./Menu.css";

class Menu extends Component {
  render() {
    var visibility = "hide";

    if (this.props.menuVisibility) {
      visibility = "show";
    }

    return (
      <div id="flyoutMenu"
           onMouseDown={this.props.handleMouseDown}
           className={visibility}>
        <h5><a href="#">Roaster</a></h5>
        <h6><a name ="Blue Bottle Coffee" href="#">Blue Bottle Coffee</a></h6>
        <h6><a name ="City of Saints" href="#">City of Saints</a></h6>
        <h6><a name ="Intelligentsia" href="#">Intelligentsia</a></h6>
        <h6><a name ="La Colombe" href="#">La Colombe</a></h6>
        <h6><a name ="Peet's Coffee" href="#">Peet's Coffee</a></h6>
        <h6><a name ="Stumptown Coffee Roasters" href="#">Stumptown Coffee Roasters</a></h6>
        <h6><a name ="Toby's Estate" href="#">Toby's Estate</a></h6>
        <h5><a href="#">Roast Level</a></h5>
        <h6><a name ="Light" href="#">Light</a></h6>
        <h6><a name ="Medium" href="#">Medium</a></h6>
        <h6><a name ="Dark" href="#">Dark</a></h6>
        <h5><a href="#">Region</a></h5>
        <h6><a name ="Latin America" href="#">Latin America</a></h6>
        <h6><a name ="Africa" href="#">Africa</a></h6>
        <h5><a name="Favorites" href="#">Favorites</a></h5>
      </div>
    );
  }
}

export default Menu;
