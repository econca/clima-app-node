const axios = require('axios');

const getClima = async(lat, lng) => {

    const respuesta = await axios({
        "method": "get",
        "url": "https://api.openweathermap.org/data/2.5/weather",
        "headers": {},
        "params": {
            "lat": lat,
            "lon": lng,
            "appid": "TU APIKEY",
            "units": "metric"
        }
    });

    return respuesta.data.main.temp;
}

module.exports = {

    getClima
}
