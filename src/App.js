import React,{Component} from 'react';

const apiKey='e087d0a804187eb8ee6d5386f3c90258';

class App extends Component{
  state= {
    
  };

  componentDidMount() {
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=Warsaw&appid=${apiKey}`,{
      method: "GET"
    })
        .then(resp=>resp.json())
        .then(data=>{
          console.log(data);
        })
        .catch(error=>console.log(error))
  }

  render() {
    return (
        <h1>Weather App</h1>
    )


  }

}

export default App;
