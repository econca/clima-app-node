const axios = require('axios');

// Para formatear data para agregar a la url cuando tienen espacios en blanco
// const encodeUrl = encodeURI(argv.ip);


// Para obtener los datos de latitud y longitud

const getLatitudLongitud = async(ip) => {

    const respuesta = await axios({
        "method": "get",
        "url": "https://ip-geolocation.whoisxmlapi.com/api/v1",
        "headers": {},
        "params": {
            "ipAddress": ip,
            "apiKey": "at_NtOcewZv0zDzNKL9GITmu0EjFncwO"
        }
    })

    const data = respuesta.data.location;

    const city = data.city;
    const region = data.region;
    const lat = data.lat;
    const lng = data.lng;

    return {
        city,
        region,
        lat,
        lng
    }


}

module.exports = {
    getLatitudLongitud,
}