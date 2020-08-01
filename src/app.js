const path = require('path');
const express = require('express')
const app = express()
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const port = process.env.PORT || 3000;

//setting paths for express config
const publicPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');


//Setting handlebars and customizing views folder, partials
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//Setting public folder(static directory) to serve
app.use(express.static(publicPath));

app.get('', (req, res) => {
    res.render('index', { title: 'Index', name: 'Max' });
});

app.get('/about', (req, res) => {
    res.render('about', { name: 'nadeem', title: 'About', role: 'developer' });
});

app.get('/help', (req, res) => {
    res.render('help', { title: 'Help', msg: 'We are here to help you', name: 'andrew' });
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({ error: 'Please add the address' });
    }
    geocode(req.query.address, (error, { longitude, latitude, location } = {}) => {
        if (error)
            return res.send({ error });

        forecast(longitude, latitude, (error, forecastData) => {
            if (error)
                return res.send({ error });
            res.send({
                location,
                forecast: forecastData,
                address: req.query.address
            });
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('pageNotFound', { errorMsg: 'Unable to find help for this article', title: '404!!', name: 'Umar' });
});

app.get('*', (req, res) => {
    res.render('pageNotFound', { errorMsg: 'Sorry Page Not Found', title: '404!!', name: 'Hakim' });
});

app.listen(port, () => {
    console.log('Server is up on port '+port)
})