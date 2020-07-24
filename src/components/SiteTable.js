import React, { Component } from 'react'
import "../styles/table.css";
import {Button} from "@material-ui/core";
import Add from "./Add.js"
import PopUp from "./PopupPerm.jsx"
import { StayCurrentLandscapeSharp } from '@material-ui/icons';
import SortByAlphaIcon from '@material-ui/icons/SortByAlpha';

class SiteTable extends Component {
   constructor(props) {
      super(props) //since we are extending class Table so we have to use super in order to override Component class constructor
      this.state = { //state is by default an object
         sites: [
            { id: 1, url: 'terrifictim.com', cdate: "11/11/2011", rev_score: '100%' },
            { id: 2, url: 'coolchristine.com', cdate: "11/11/2011", rev_score: '100%' },
            { id: 3, url: 'dapperdarby.com', cdate: "11/11/2011", rev_score: '100%' },
            { id: 4, url: 'tiffunny.com', cdate: "11/11/2011", rev_score: '100%' }
         ],
         seen: false
         
      }
      this.keyPress = this.keyPress.bind(this);
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
      console.log("Add Row Value clicked")
      console.log(value)
      var curr = this.state.sites
      let newobj = {id: 0, url: value, cdate: "11/11/2011", rev_score: '80%'}
      curr.push(newobj)
      this.setState({
         sites: curr,
       });
      this.renderTableData()
      //call script to pull data as opposed to just default

   }
   renderTableHeader() {
    let header = ["id","URL","Date Created", "Reviewer Score", "Delete"] //Object.keys(this.state.sites[0])
    return header.map((key, index) => {
       return <th key={index}>{key.toUpperCase()}</th>
    })
 }
   renderTableData() {
   console.log("Table rendering")
   console.log(this.state.sites)
    return this.state.sites.map((sites, index) => {
      const { id, url, cdate, rev_score } = sites //destructuring
       return (
          <tr key={id}>
             <td>{id}</td>
             <td>{url}</td>
             <td>{cdate}</td>
             <td>{rev_score}</td>
             {<Button id = "row"
             onClick={() =>{
               this.deleteRow.bind(this,id)();
             }}
             >Remove</Button>}
          </tr>
          
       )
    })
 }

   render() { //Whenever our class runs, render method will be called automatically, it may have already defined in the constructor behind the scene.
      return (
        <div>
        <h1 id='title'>My Sites</h1>
        <Add data= {this.state}
                ref={input => this.inputElement = input}
                onClick={(val) => { this.addRow(val)}} 
                
                onCancel={() => { this.addRow('') }}
               //  onKeyDown={this.keyPress}
                placeholder={"Input site"}
                style={{height:'70%',width:'60%'}}
                />
       {/*  <div className="btn" onClick={this.togglePop}>
      <button>New User?</button>
    </div>
    {this.state.seen ? <PopUp toggle={this.togglePop} /> : null} */}
      
        <table id='sites'>
           <tbody>
           <tr>{this.renderTableHeader()}</tr>
                  {this.renderTableData()}
           </tbody>
        </table>
        </div>
     
      )
   }
}


export default SiteTable //exporting a component make it reusable and this is the beauty of react