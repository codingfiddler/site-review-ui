import React, {Component} from 'react'
import {
  FormControl,
  InputLabel,
  Input,
  Button,
  TextField
} from "@material-ui/core";


export default class PhoneField extends Component {
  constructor(props) {
    super(props)
    this.state = { errorText: '', value: props.value }
  }
  onChange(event) {
    if (event.target.value.match("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$")) {
      this.setState({ errorText: '' })
    } else {
      this.setState({ errorText: 'Invalid email' })
    }
  }
  render() {
    return (
        <TextField
            hintText="Phone"
            floatingLabelText="Phone"
            name="phone"
            error ={this.state.errorText.length === 0 ? false : true }
            helperText= {this.state.errorText}
            onChange={this.onChange.bind(this)}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Email"
            id="password"
            autoComplete="current-password"
          />
    )
  }
}