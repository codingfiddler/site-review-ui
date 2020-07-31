import React, {Component} from 'react'
import {
  FormControl,
  InputLabel,
  Input,
  Button,
  TextField
} from "@material-ui/core";
import { Grid, Paper, Typography } from "@material-ui/core";
import SiteTable from "./SiteTable.js"
import Dropdown from 'react-bootstrap/Dropdown'


export default class Dashboard extends Component{

    render(){
        return(
            <div
        style={{
          display: "flex",
          justifyContent: "center",
          margin: 20,
          padding: 20
        }}
      >
        <form style={{ width: "100%" }}>
          <h1>My Dashboard</h1>
          
          <div style={{ width:'80%', marginLeft:'7%', marginTop: '3%',display: "inline-block"}}>
          
            {/* <Search data= {this.state}
                ref={input => this.inputElement = input}
                onClick={(val) => { this.searchFunc(val) }} 
                onCancel={() => { this.searchFunc('') }}
                placeholder={"Search site"}
                style={{height:'70%'}}
            /> */}
        </div>
        <h1 id='title'>My Sites</h1>
          <SiteTable/>
          {/* <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            Dropdown Button
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown> */}
 
        </form>
        
        

      </div>

        )
    
    }
}