import React, {Component} from 'react';
import './styles.scss';
import 'weather-icons/css/weather-icons.css'
import Search from '@material-ui/icons/Search'
import Weather from "./components/weather";

const apiKey = 'e087d0a804187eb8ee6d5386f3c90258';

class App extends Component {
    state = {
        searchVal: '',
        city: '',
        temp: '',
        description: '',
        icon: undefined,
        error:'',
        allIcons: {
            thunder: 'wi-thunderstorm',
            drizzle: 'wi-sleet',
            rain:'wi-storm-showers',
            snow: 'wi-snow',
            atmosphere: 'wi-fog',
            clear: 'wi-day-sunny' ,
            clouds: 'wi-day-fog'
        }
    };

    getIcon= (range)=>{
        switch (true) {
            case range>=200 && range<=232:
                this.setState({icon:this.state.allIcons.thunder});
                break;
            case range>=300 && range<=321:
                this.setState({icon:this.state.allIcons.drizzle});
                break;
            case range>=500 && range<=531:
                this.setState({icon:this.state.allIcons.rain});
                break;
            case range>=600 && range<=622:
                this.setState({icon:this.state.allIcons.snow});
                break;
            case range>=700 && range<=781:
                this.setState({icon:this.state.allIcons.atmosphere});
                break;
            case range ===800:
                this.setState({icon:this.state.allIcons.clear});
                break;
            case range>800 && range<=804:
                this.setState({icon:this.state.allIcons.clouds});
                break;
            default:
                this.setState({icon:this.state.allIcons.clouds});
        }
    };

    handleOnSubmit = e => {
        e.preventDefault();
        this.setState({
            searchVal: ''
        });
        fetch(`http://api.openweathermap.org/data/2.5/weather?q=${this.state.searchVal}&appid=${apiKey}`, {
            method: "GET"
        })
            .then(resp => resp.json())
            .then(data => {
                console.log(data);
                this.setState({
                    city: data.name,
                    temp: Math.floor(data.main.temp - 273.15),
                    description: data.weather[0].description,
                    error:''
                });
                this.getIcon(data.weather[0].id)

            })
            .catch(error => {
                this.setState({
                    city: '',
                    temp: '',
                    description: '',
                    error: 'There is no such city in our base :('
                });
            })

    };

    handleOnChange = (e) => {
        this.setState({
            searchVal: e.target.value
        })
    };

    render() {
        return (
            <>
                <form onSubmit={this.handleOnSubmit} className='search-form'>
                    <input onChange={this.handleOnChange} type="text" value={this.state.searchVal}
                           placeholder='City...'
                           required
                    />
                    <button className='search-btn'>
                        <Search className='search-icon'/>
                    </button>
                </form>
                {this.state.error?<h1 className='error'>{this.state.error}</h1>:null}
                {!this.state.city?null:<Weather temp={this.state.temp}
                                                icon={this.state.icon}
                                                name={this.state.city}
                                                desc={this.state.description}
                />}

                <div className="bg-image"/>

            </>
        )
    }
}
export default App;
