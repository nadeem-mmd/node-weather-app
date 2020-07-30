const request = require('request');

const forecast = (long, lat, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=682c230f69f2cc5c88e04607aef50398&query=${lat},${long}`;
    request({ url, json: true }, (error, {body}) => {
        if (error)
            callback('Unable to fetch weather data');
        else if (body.error)
            callback('Unable to find the weather for given location');
        else
            callback(undefined,
                `It is ${body.current.weather_descriptions[0]}. Temperature is ${body.current.temperature} and feels like ${body.current.feelslike}`
            )
    });
}

module.exports = forecast;