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
        maxTemp: '',
        minTemp: '',
        icon: undefined,
        allIcons: {
            thunder: 'wi-owm-200',
            drizzle: 'wi-owm-520',
            rain:'wi-owm-302',
            snow: 'wi-owm-600',
            atmosphere: 'wi-owm-741',
            clear: 'wi-owm-804' ,
            clouds: 'wi-owm-904'

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
                    tempMax: Math.floor(data.main.temp_max - 273.15),
                    tempMin: Math.floor(data.main.temp_min - 273.15)
                });
                this.getIcon(data.weather[0].id)

            })
            .catch(error => console.log(error))

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
                           placeholder='City...'/>
                    <button className='search-btn'>
                        <Search className='search-icon'/>
                    </button>
                </form>
                <Weather temp={this.state.temp}
                         tempMax={this.state.maxTemp}
                         tempMin={this.state.minTemp}
                         icon={this.state.icon}
                />

            </>
        )


    }

}

export default App;
