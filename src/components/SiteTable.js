import React, { Component} from 'react'
import "../styles/table.css";
// import {Button} from "@material-ui/core";
import Alert from '@material-ui/lab/Alert';
import Add from "./Add.js"
import PopUp from "./PopupPerm.jsx"
import { StayCurrentLandscapeSharp } from '@material-ui/icons';
import SortByAlphaIcon from '@material-ui/icons/SortByAlpha';
import Pages from "../pages/Pages";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import { withRouter } from "react-router-dom";
import InputLabel from '@material-ui/core/InputLabel';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import axios from 'axios';
import {
   BrowserRouter as Router,
   Switch,
   Route,
   Link
 } from "react-router-dom";
//  const { useEffect, useState } = React
/* useEffect(() => {
  fetchsites();
}) */


  


class SiteTable extends Component {
   constructor(props) {
      super(props) //since we are extending class Table so we have to use super in order to override Component class constructor
      this.state = { //state is by default an object
         /* sites: [
            { id: 10, url: 'terrifictim.com', cdate: new Date(2018, 11, 24).toString(), rev_score: '85%' },
            { id: 5, url: 'coolchristine.com', cdate: new Date(2018, 11, 5).toString(), rev_score: '91%' },
            { id: 3, url: 'dapperdarby.com', cdate: new Date(2004, 11, 11).toString(), rev_score: '89%' },
            { id: 4, url: 'tiffunny.com',cdate: new Date(2005, 11, 24).toString(), rev_score: '73%' }
         ], */
         sites: [],
         seen: false,
         direction:1,
         
      }
      this.keyPress = this.keyPress.bind(this);

   }
   componentDidMount(){
    this.fetchsites()
    this.sendsites()
   }
   fetchsites = async ()=>{
    console.log("Fetch Sites called")
    try{
    const response= await axios.get("https://api.sitereview.fiddlingphotographer.com/websites/")
    this.setState({sites: response.data})
    this.populateValues()
    }
    catch(e){
        //add something for errors 
    }

  };
  sendsites = async (new_site_data)=>{
    console.log("Send Sites called")
    try{
    const old = await axios.get("https://api.sitereview.fiddlingphotographer.com/websites/")
    var difference = this.state.sites.length - old.data.length  
    var added = this.state.sites.slice(old.data.length)
    console.log(difference)
    console.log(added)
    const response= await axios.post("https://api.sitereview.fiddlingphotographer.com/websites/", this.state.sites)
      this.setState({sites: [...this.state.sites, response.data]})
    /* for (var i =0 ; i< this.state.sites.length;i++){
      
      const response= await axios.post("https://api.sitereview.fiddlingphotographer.com/websites/", this.state.sites[i])
      this.setState({sites: [...this.state.sites, response.data]})
    } */
        }
    catch(e){
        //add something for errors 
    }

  };
  populateValues(){
    //console.log("Populating")
    //console.log(this.state.sites)
    var values = this.state.sites
    for (var i =0; i<values.length;i++){
      values[i]['cdate'] = "09/21/2012"
      values[i]['rev_score'] = Math.floor(Math.random() * Math.floor(100)) + "%"
      //console.log(values[i])
    }
    this.setState({sites: values})
  }

   keyPress(e){
      e.preventDefault();
      if(e.keyCode === 13){
        this.props.onClick(this.state.addRow)
      }
    }
    
    togglePop = () => {
      this.setState({
       seen: !this.state.seen
      });
     };
   deleteRow(id){
      var curr = this.state.sites
      var removeIndex = curr.map(function(item){return item.id}).indexOf(id);
      curr.splice(removeIndex,1);
      this.setState({
         sites: curr,
       });
      this.renderTableData()

   }
   addRow(value){
      //console.log(value.length)
      if (value =="" || value.length<3 || !value.includes("."))
      {
         return (
            <div>
               <Alert variant="outlined" severity="error"onClose={() => {}}>
                  This is an error alert — check it out!
               </Alert>
            </div>
         )
         
         console.log("No value")
      }
      else{
         console.log("Add Row Value clicked")
      console.log(value)
      var curr = this.state.sites
      let newobj = {id: this.state.sites.length+1,pages:[], domain: value, owner:1, cdate: "08/01/2020", rev_score: '80%'}
      
      curr.push(newobj)
      this.setState({
         sites: curr,
       });
      this.renderTableData()
      }
      
      //call script to pull data as opposed to just default

   }
   renderTableHeader() {
    let header = ["id","URL","Date Created", "Reviewer Score", "Delete","Review"] //Object.keys(this.state.sites[0])
    return header.map((key, index) => {
       return <th key={index}><Button>{key.toUpperCase()}</Button></th>
    })
 }
/* requestSort(value){
   console.log(value)
   this.state.sites.sort((a, b) => {
      console.log(a)
      console.log(b)
      console.log(a.value)
      console.log(b.value)
      if (a.value < b.value) {
        return -1;
      }
      if (a.value > b.value) {
        return 1;
      }
      return 0;
    });
    console.log(this.state.sites)
    this.renderTableData()
} */
sortid(value){
   //neutralize others 
   var url = document.getElementById("urlbton").innerHTML="URL";
   var cdate = document.getElementById("cdatebton").innerHTML="Date Created";
   var rev = document.getElementById("revbton").innerHTML="Reviewer Score";
 
   //start
  var elem = document.getElementById("idbton");

   //this.state.direction = value
   console.log(this.state.direction)
   if(this.state.direction < 1) {   
      this.state.sites.sort((a, b) => a.id - b.id).reverse()
      elem.innerHTML = "ID 👇";
   }
   else{
      
      this.state.sites.sort((a, b) => a.id - b.id)
      elem.innerHTML = "ID☝️";
   }
   
    console.log("id sort")
    console.log(this.state.sites)
    this.setState({
      sites: this.state.sites,
      direction: -this.state.direction,
    });
   this.renderTableData()
}
sorturl(value){
  //neutralize others 
  var id = document.getElementById("idbton").innerHTML="ID";
  var cdate = document.getElementById("cdatebton").innerHTML="Date Created";
  var rev = document.getElementById("revbton").innerHTML="Reviewer Score";

  //start
  var elem = document.getElementById("urlbton");
   console.log(this.state.direction)
   if(this.state.direction < 1) {   
   this.state.sites.sort((a, b) => {
      return -(a.domain).localeCompare(b.domain);
    });
    elem.innerHTML = "URL👇";
   }
   else{
      this.state.sites.sort((a, b) => {
         return (a.domain).localeCompare(b.domain)
       });
      elem.innerHTML = "URL☝️";
   }
     console.log("url sort")
     this.setState({
       sites: this.state.sites,
       direction: -this.state.direction,
     });
    this.renderTableData()
   
}
sortcdate(){
  //neutralize others 
  var id = document.getElementById("idbton").innerHTML="ID";
  var url = document.getElementById("urlbton").innerHTML="URL";
  var rev = document.getElementById("revbton").innerHTML="Reviewer Score";

  //start
 var elem = document.getElementById("cdatebton");

   if(this.state.direction < 1) {   
      this.state.sites.sort((a, b) => {
         var d1 = Date.parse(a.cdate);
         var d2 = Date.parse(b.cdate);
         if (d1 < d2) {
            return -1;
          }
          if (d1 > d2) {
            return 1;
          }
          return 0;
       });
       elem.innerHTML = "Date Created👇";
      }
      else{
         this.state.sites.sort((a, b) => {
            var d1 = Date.parse(a.cdate);
            var d2 = Date.parse(b.cdate);
            if (d1 < d2) {
               return 1;
             }
             if (d1 > d2) {
               return -11;
             }
             return 0;
          });
          elem.innerHTML = "Date Created☝️";
      }
    console.log("url sort")
    this.setState({
      sites: this.state.sites,
      direction: -this.state.direction,
    });
   this.renderTableData()
}
sortrevscore(){
   //neutralize others 
   var id = document.getElementById("idbton").innerHTML="ID";
   var url = document.getElementById("urlbton").innerHTML="URL";
   var cdat = document.getElementById("cdatebton").innerHTML="Date Created";
 
   //start
  var elem = document.getElementById("revbton");

   console.log(this.state.direction)
   if(this.state.direction < 1) {   
   this.state.sites.sort((a, b) => {
      return -(a.rev_score).localeCompare(b.rev_score);
    });
    elem.innerHTML = "Reviewer Score👇";
   }
   else{
      this.state.sites.sort((a, b) => {
         return (a.rev_score).localeCompare(b.rev_score);
       });
       elem.innerHTML = "Reviewer Score☝️";
   }
     console.log("url sort")
     this.setState({
       sites: this.state.sites,
       direction: -this.state.direction,
     });
    this.renderTableData()
   
}

renderTableData() {
   console.log("Table rendering")
   console.log(this.state.sites)
   /* this.state.sites.sort((a, b) => {
      if (a.id < b.id) {
        return -1;
      }
      if (a.id > b.id) {
        return 1;
      }
      return 0;
    }); */

    return this.state.sites.map((sites, index) => {
      const { id, domain, cdate, rev_score } = sites //destructuring
       return (
          <tr key={id}>
             <td>{id}</td>
             <td> {domain}</td>
             <td>{cdate}</td>
             <td>{rev_score}</td>
             <td><Button variant="contained" onClick={() => this.deleteRow.bind(this,id)()}>
               Remove URL
            </Button></td>
            <td><Link to="/pages"><Button variant="contained">
               View Pages
            </Button></Link></td>
             {/* {<Button id = "row"
             onClick={() =>{
               this.deleteRow.bind(this,id)();
             }}
             >Remove</Button>} */}
          </tr>
          
       )
    })
 }
 render2(){
   const tableRows = this.state.sites.map((sites, index) => (
      <TableRow>
        <TableCell>
          <Box display="flex" justifyContent="space-between">
            <Box
              fontFamily="Monospace"
              fontSize="16px"
              display="flex"
              alignItems="center"
            >
              {/* {pageInfo.page} */}
            </Box>
          </Box>
        </TableCell>
        <TableCell>{sites.id}</TableCell>
        <TableCell>{sites.url + " minutes"}</TableCell>
        <TableCell>{sites.cdate}</TableCell>
        <TableCell>{sites.rev_score}</TableCell>
        {/* <TableCell>
          <Button variant="contained" onClick={() => nextPath("/review")}>
            Review Page
          </Button>
        </TableCell> */}
      </TableRow>
    ));
    return tableRows
 }


   render() { //Whenever our class runs, render method will be called automatically, it may have already defined in the constructor behind the scene.
      return (
        <div>
        
        <Add data= {this.state}
                ref={input => this.inputElement = input}
                onClick={(val) => { this.addRow(val)}} 
                
                onCancel={() => { this.addRow('') }}
               //  onKeyDown={this.keyPress}
                placeholder={"Input site"}
                style={{height:'70%',width:'60%',display:"inline-block"}}
                />
               
      
        <table id='sites'>
           <th>
           <button class = "header"
              type="button" id ="idbton" value = "ID"onClick={() =>this.sortid(this.direction)}
          >
              ID
            </button>
          </th>
          <th>
            <button class = "header"
              type="button" id= "urlbton"
              onClick={() => this.sorturl(this.direction)}
             
            >
              URL
            </button>
          </th>
          <th>
            <button class = "header"
              type="button" id = "cdatebton"
              onClick={() => this.sortcdate(this.direction)}
             
            >
              Date Created
            </button>
            </th>
            <th>
            <button class = "header"
              type="button" id ="revbton"
              onClick={() => this.sortrevscore(this.direction)}
             
            >
              Reviewer Score
            </button>
            </th>
            <th>Delete</th>
            <th>Review</th>
            <tbody>
           {/* <tr>{this.renderTableHeader()}</tr> */}
           
                  {this.renderTableData()}
           </tbody>
        </table>
        {/* <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>URL</TableCell>
              <TableCell>Creation Date</TableCell>
              <TableCell>Reviewer Score</TableCell>
              <TableCell>View Pages</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{this.render2()}</TableBody>
        </Table>
      </TableContainer> */}
        </div>
     
      )
   }
}


export default SiteTable //exporting a component make it reusable and this is the beauty of react