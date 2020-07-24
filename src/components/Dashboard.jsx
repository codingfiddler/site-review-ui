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
        
          <SiteTable/>
          
        </form>
        
        

      </div>

        )
    
    }
}