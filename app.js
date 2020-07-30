const isIp = require('is-ip');
const publicIp = require('public-ip');

const lugar = require('./utils/lugar');
const clima = require('./utils/clima');

const argv = require('yargs').options({
        ip: {
            alias: 'i',
            desc: 'Dirección IP para buscar la ciudad donde está y así obtener el clima',
        }
    })
    .help()
    .argv;

const getInfo = async(ip) => {

    try {

        const coordenadas = await lugar.getLatitudLongitud(ip);
        const temp = await clima.getClima(coordenadas.lat, coordenadas.lng);
        return `La IP ${ip} pertence a la ciudad ${coordenadas.city} de la región de ${coordenadas.region}\n` +
            `La temperatura actualmente ahí es de ${temp}°C`;

    } catch (error) {
        return `No se pudo obtener el clima de ${coordenadas.city} donde está la IP IP ${ip}`;
    }
}


if (isIp(argv.ip)) {

    getInfo(argv.ip)
        .then(console.log)
        .catch(console.log);

} else {
    // Si no se entregó un argumento válido como IP, te da la respuesta con tu IP pública
    publicIp.v4()
        .then(miIp => getInfo(miIp)
            .then(console.log)
            .catch(console.log)
        )
        .catch(err => console.log(err));

}