import React, {Component} from 'react'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import TypoGraphy from '@material-ui/core/Typography'
import ReviewPageContent from "../pages/ReviewPageContent.jsx"
import { Home, Settings, RateReview} from '@material-ui/icons'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Welcome from "./Welcome.jsx"
import Signin from "../pages/Signin.jsx"
import Signup from "../pages/Signup.jsx"
import "../styles/navbar.css";

export default class NavBar extends Component{
  constructor() {
    super();
    
    this.state = {
      showMenu: false,
    }
    this.showMenu = this.showMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
  }
  showMenu(event) {
    event.preventDefault();
    
    this.setState({ showMenu: true }, () => {
      document.addEventListener('click', this.closeMenu);
    });
  }
  
  closeMenu() {
    this.setState({ showMenu: false }, () => {
      document.removeEventListener('click', this.closeMenu);
    });
  }

  render(){
    return(
      

      <List component="nav">
        <ul>
  <li><a href="/"> Home <RateReview/> </a></li>
  {/* <li><Link to="/dashboard">My Dashboard <Home /></Link></li> */}
  <li class="dropdown">
    <a href="/dashboard" class="dropbtn">Dashboard <Home /></a>
    <div class="dropdown-content">
      <a href="#">My Sites</a>
      <a href="/pages">My Pages</a>
      <a href="/review">Page Content</a>
    </div>
  </li>
  <li class="dropdown">
    <a href="javascript:void(0)" class="dropbtn">Settings <Settings /></a>
    <div class="dropdown-content">
      <a href= "/signin">Sign In</a>
      <a href="/signup">Sign Up</a>
    </div>
  </li>

</ul>

      {/* <ListItem component="div">
          <ListItemText inset>
              <TypoGraphy color="inherit" variant="title">
                   <Link to="/"> 
                   <RateReview/> 
                   </Link>
         </TypoGraphy>
          </ListItemText>
         


          <ListItemText inset>
              <TypoGraphy color="inherit" variant="title">
              <li onClick={this.showMenu}><Link to="/dashboard">My Dashboard <Home /></Link></li> */}
              {/* {
          this.state.showMenu
            ? (
              <div className = "menu">
                <button  onClick={this.showMenu}>My Sites </button>
                <button >Sites </button>
                <button>Pages </button>
                <Link to = "/review"> <button >Page Content </button> </Link>
                <button>My Pages </button>
              </div>
            )
            : (
              null
            )
        } */}

              
         {/* </TypoGraphy> 
         
          </ListItemText>
          <ListItemText inset>
          <TypoGraphy color="inherit" variant="title">
              <li><Link to="/review"> Page Content  </Link></li> 
              </TypoGraphy>
            </ListItemText>


          <ListItemText inset>
              <TypoGraphy color="inherit" variant="title">
              <li onClick={this.showMenu}><Link to="/signin">Sign In <Settings /></Link></li>  */}
              {/* {
          this.state.showMenu
            ? (
              <div className = "menu2">
                <button onClick={this.showMenu}><Link to="/signin">Sign In </Link></button>
                
              </div>
            )
            : (
              null
            )
        } */}
         {/* </TypoGraphy>
          </ListItemText>
      </ListItem >*/}

  </List> 
    )
  }
  
}
