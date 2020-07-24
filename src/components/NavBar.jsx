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
import Signin from "./Signin.jsx"
import Signup from "./Signup.jsx"
import Welcome from "./Welcome.jsx"


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
      <ListItem component="div">
          <ListItemText inset>
              <TypoGraphy color="inherit" variant="title">
                   <Link to="/"> 
                   <RateReview/> 
                   </Link>
         </TypoGraphy>
          </ListItemText>
         


          <ListItemText inset>
              <TypoGraphy color="inherit" variant="title">
              <li onClick={this.showMenu}><Link to="/dashboard">My Dashboard <Home /></Link></li>
              {/* {
          this.state.showMenu
            ? (
              <div className = "menu">
                <button onClick={this.showMenu}>My Sites </button>
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

              
         </TypoGraphy> 
         
          </ListItemText>
          <ListItemText inset>
          <TypoGraphy color="inherit" variant="title">
              <li><Link to="/review"> Page Content  </Link></li> 
              </TypoGraphy>
            </ListItemText>


          <ListItemText inset>
              <TypoGraphy color="inherit" variant="title">
              <li onClick={this.showMenu}><Link to="/signin">Sign In <Settings /></Link></li> 
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
         </TypoGraphy>
          </ListItemText>
      </ListItem >

  </List>
    )
  }
  
}
