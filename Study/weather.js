const weather = document.getElementsByClassName("js-weather")[0];
const API_KEY = "3cb5e9d09f5b857f79b7b0def9542649";
const COORDS = 'coords';

function getWeather(lat, lng) {
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
        ).then(function(response) {
            return response.json()
        }).then(function(json) {
            const temp = json.main.temp;
            const place = json.name;
            console.log(`${temp}.C  ${place}`)
            console.log(weather)

            weather.innerHTML  = `${temp}.C  ${place}`;
        })
    }


function saveCoords(coordsoj) {
    localStorage.setItem(COORDS, JSON.stringify(coordsoj))
    console.log(COORDS, JSON.stringify(coordsoj))

}


function handleGeoSucces(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsoj = {
        latitude,
        longitude
    };
saveCoords(coordsoj)
getWeather(latitude, longitude)
}

function handleGeoError() {
    console.log('Cant access geo location')
}

function askForCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError);
}

function loadCoords() {
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null){
       askForCoords(); 
    }else{
        const parseCoords = JSON.parse(loadedCoords)
        getWeather(parseCoords.latitude, parseCoords.longitude);

    }
}

function init() {
    loadCoords();
}

init();