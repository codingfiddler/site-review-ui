import React from 'react';


export default class InputFormTheFirst extends React.Component {

    state = {
        url: 'https://my.codeday.team.is.cool.io',
        rating: 5
    }

    handleUrlChange = (e) => {
        const newValue = e.target.value;
        this.setState({
            url: newValue
        })
    }

    handleRatingChange = (e) => {
        const newValue = e.target.value;
        this.setState({
            rating: newValue
        })
    }

    render() {
        return (
            <div>
                <h3>My current values are</h3>
        <p>Rating is: {this.state.rating}</p>
                <p>URL is: {this.state.url}</p>
                <form>
                    <input name="url" type="text" value={this.state.url} onChange={this.handleUrlChange} />
                    <select value={this.state.rating} onChange={this.handleRatingChange}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                </form>
            </div>
        )
    }
}
