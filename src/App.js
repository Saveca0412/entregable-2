import axios from 'axios'
import { useEffect, useState } from "react";
import './App.css';




function App() {
  const [data, setData] = useState({});
  const [celcius,setCelcius] = useState(0);
  const [isFahrenheit,setIsFahrenheit] = useState(true);

  useEffect(() => {

    const success = pos => {
      const lat = pos.coords.latitude;
      const lon = pos.coords.longitude;
      axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=7943f41dbd670c537af92d3c756bb622`)
        .then((res) =>{ 
          setData(res.data);
          setCelcius(res.data.main?.temp)
        });
    
      }
      navigator.geolocation.getCurrentPosition(success);
    }, [])
    
    console.log(data)
    
    
    const convertCelcius = () =>{
      
      
      if (isFahrenheit){
        setCelcius((celcius -273.15) * (9/5) + 32);
        setIsFahrenheit(false);
      } else{
        setCelcius((celcius -32)*5/9 +273.15 );
        setIsFahrenheit(true);
      }
    }
    
  
      return (
        <div className="Card">
          <h1>Weather app</h1>
          <h3>{data.name},{data.sys?.country}</h3>
          <div className='flex'>
          <div className='image'>
          <img className='img' src={`http://openweathermap.org/img/wn/${data.weather?.[0].icon}@2x.png`} alt="" />
          </div>
          <div className='container'>
          <h3>Pressure: {data.main?.pressure}mb</h3>
          <h3>Clouds: {data.clouds?.all}%</h3>
          <h3>Humidity: {data.main?.humidity}g/m³</h3>
          </div>
          </div>
          <li>
            {isFahrenheit? celcius-273.15:celcius}{ isFahrenheit? "°C":"°F"}
          </li>
          <button className='convert' onClick={convertCelcius}>Degrees C°/F°</button>        
        </div>
      );
    }
export default App;
