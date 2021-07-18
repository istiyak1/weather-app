const condition = document.getElementById('condition')
const city = document.getElementById('city')
const country = document.getElementById('country')
const main = document.getElementById('main')
const description = document.getElementById('description')
const temp = document.getElementById('temp')
const pressure = document.getElementById('pressure')
const humidity = document.getElementById('humidity')
const sunrise = document.getElementById('sunrise')
const deg = document.getElementById('deg')

const cityName = document.getElementById('cityname')
const history = document.getElementById('history')
const historyResult = document.getElementById('history-result')
const current = 'Kurigram, BD'

const KEY = 'd31c6fb1ff108e6d492dd7006ab9c957'
const API = `https://api.openweathermap.org/data/2.5/weather?appid=${KEY}`
const ICON = 'https://openweathermap.org/img/wn/'

window.onload = function(){
    navigator.geolocation.getCurrentPosition( s=> {
        getweather(null, s.coords)
    }, e =>{
        getweather()
    })
    
    cityName.addEventListener('keypress', function(e){
        if(e.key == 'Enter'){
            if(e.target.value){
                getweather(e.target.value)
                e.target.value = ''
            }else{
               console.log('Provide a valid City Name')
            }
        }
    })
}

function getweather(city = current, coords){
    
    url = API

    city === null ?
        url = `${url}&lat=${coords.latitude}&long=${coords.longitude}`:
        url = `${url}&q=${city}`
    
getRequest(url)
    .then( (data) => {

      let infoweather = {
           icon: data.weather[0].icon,
           name: data.name,
           country: data.sys.country,
           main: data.weather[0].main,
           description: data.weather[0].description,
           temp: data.main.temp,
           pressure: data.main.pressure,
           humidity: data.main.humidity,
           sunrise: data.sys.sunrise,
           deg: data.wind.deg
       }

       ourweather(infoweather)
    })
    .catch( e=> {
        console.log(e)
    })
}

function ourweather(infoweather){
    condition.src =`${ICON}/${infoweather.icon}.png`
    city.innerHTML = infoweather.name
    country.innerHTML = infoweather.country
    main.innerHTML = infoweather.main
    description.innerHTML = infoweather.description
    temp.innerHTML = infoweather.temp
    pressure.innerHTML = infoweather.pressure
    humidity.innerHTML = infoweather.humidity
    sunrise.innerHTML = infoweather.sunrise
    deg.innerHTML = infoweather.deg
}

// get Request with Promise
function getRequest(url){
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest
        xhr.open('get', url)
    
        xhr.onreadystatechange = function(e){
            if(xhr.readyState == 4){
                if(xhr.status == 200){
                    let res = JSON.parse(xhr.response)
                    resolve(res)
                }else{
                    reject(new Error('Error Occured'))
                }
            }
        }
        xhr.send()
    })
}
