import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import TextField from "@material-ui/core/TextField";
import React from "react";

export default class Add extends React.Component{
  constructor(props) {
    super(props);
    this.state={
      addVal:'',
      data:this.props.data
    }
    
  }

  

  render(){
   // height of the TextField
   const height = 44;
   // magic number which must be set appropriately for height
   const labelOffset = -6;

   let iconCol = this.props.iconColor === undefined ? 'black' : this.props.iconColor
    return(
      <div style={{display:'inline'}}>
        <TextField
          style={{ width: "100%", height}}
          id="input-with-icon-textfield"

          /* styles the label component */
          InputLabelProps={{
            style: {
              height,
              ...({ top: `${labelOffset}px` }),
            },
          }}

          /* styles the input component */
          inputProps={{
              style: {
                height,
                padding: '0 14px',
              },
          }}

          placeholder={this.props.placeholder === undefined ? "Search site now"
                                                            : this.props.placeholder}
          value={this.state.addVal}
          onChange={(val) => {this.setState({addVal:val.target.value})}}
          variant="outlined"
          
          InputProps={{
            endAdornment: (
              <div>
                <InputAdornment position="end">
                  <IconButton onClick={() => {this.props.onClick(this.state.addVal)}}>
                      <AddCircleOutlineIcon style={{color:iconCol}}/>
                  </IconButton>
                </InputAdornment>
              </div>
            )
          }}
        />
      </div>

    )
  }
}