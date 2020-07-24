import React from 'react';

export default class InputFormTheFirst extends React.Component{
    state ={
        url:'https://my.codeday.time.is.cool.io',
        rating: 5 
    }
    handleUrlChange = (e)=>{
        const newValue = e.target.value;
        this.setState({
            url:newValue
        })

    }
    handleRatingChange =(e)=>{
        const newValue = e.target.value;
        this.setState({
            rating:newValue
        })
    }
    render(){
        return(
            <div> 
                <h1>My current values are</h1>
                Rating is: 
                <form>
                <input name="url" type="text" value ={this.state.url} onChange={this.handleUrlChange}/>
                <select value = {this.state.rating} onChange={this.handleRatingChange}>
                    <option value = "1">1</option>
                    <option value = "2" >2</option>
                    <option value = "3">3</option>
                    <option value = "5">4</option>
                    <option value = "5">5</option>
                </select>
                </form>
            </div>
            
        )
    }
}