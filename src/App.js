import React, {Component} from 'react';
import Search from '@material-ui/icons/Search'
import './styles.scss'

const apiKey = 'e087d0a804187eb8ee6d5386f3c90258';

class App extends Component {
    state = {
        searchVal: ''
    };

    componentDidMount() {
        fetch(`http://api.openweathermap.org/data/2.5/weather?q=Warsaw&appid=${apiKey}`, {
            method: "GET"
        })
            .then(resp => resp.json())
            .then(data => {
                console.log(data);
            })
            .catch(error => console.log(error))
    }

    handleOnChange = (e) => {
        this.setState({
            searchVal: e.target.value
        })
    };

    render() {
        return (
            <>
                <form className='search-form'>
                    <input onChange={this.handleOnChange} type="text" value={this.state.searchVal} placeholder='City...'/>
                    <button className='search-btn'>
                      <Search className='search-icon'/>
                    </button>
                </form>

            </>
        )


    }

}

export default App;
