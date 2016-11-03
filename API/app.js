var express = require('express')
var app = express()
const http = require('http')
const port = process.env.PORT || 4000
const HTTPError = require('node-http-error')
const dal = require('../DAL/no-sql.js')
var bodyParser = require('body-parser')
app.use(bodyParser.json())//


function BuildResponseError(err) {
    const statuscheck = isNaN(err.message.substring(0, 3)) === true
        ? "400"
        : err.message.substring(0, 3)
    const status = err.status
        ? Number(err.status)
        : Number(statuscheck)
    const message = err.status
        ? err.message
        : err.message.substring(3)
    const reason = message
    const error = status === 400
        ? "Bad Request"
        : err.name
    const name = error

    var errormsg = {}
    errormsg.error = error
    errormsg.reason = reason
    errormsg.name = name
    errormsg.status = status
    errormsg.message = message

    //   { error: 'Bad Request',
    // reason: 'Missing email property within data',
    // name: 'Bad Request',
    // status: 400,
    // message: 'Missing email property within data' }
    console.log("BuildResponseError-->", errormsg)
    return errormsg
}

app.get('/', function(req, res, next) {
  res.send('Hello World')
})

app.get('/venues/:id', function(req, res, next) {
    // const venueID = req.params.id
    res.send(venueID)  //<- use to test
    dal.getVenue(VenueID, function(err, data) {
        if (err) {
                var responseError = BuildResponseError(err)
                return next(new HTTPError(responseError.status, responseError.message, responseError));
            }
        console.log('Call successful.  Here is the venue information', data)
        res.append('Content-type', 'application/json')
        res.status(200).send({data})

    })

})



app.get('/cities/:id', function(req, res, next) {
    const venueID = req.params.id
     //res.send(venueID)  //<- use to test
     dal.getCity(VenueID, function(err, data) {
        if (err) {
            var responseError = BuildResponseError(err)
            return next(new HTTPError(responseError.status, responseError.message, responseError));
        }
        console.log('Call successful.  Here is the city information', data)
        res.append('Content-type', 'application/json')
        res.status(200).send({data})

    })

})

app.post('/venues', function(req, res, next) {
    console.log(req.body)
    dal.createVenue(req.body, function(err, data) {
        if (err) {
            var responseError = BuildResponseError(err)
            return next(new HTTPError(responseError.status, responseError.message, responseError));
        }
        console.log('Call successful.  Venue created', data)
        res.append('Content-type', 'application/json')
        res.status(201).send(JSON.stringify(data, null, 2))

    })

})

app.post('/cities', function(req, res, next) {
    console.log(req.body)
    dal.createCity(req.body, function(err, data) {
        if (err) {
            var responseError = BuildResponseError(err)
            return next(new HTTPError(responseError.status, responseError.message, responseError));
        }
        console.log('Call successful.  City record created', data)
        res.append('Content-type', 'application/json')
        res.status(201).send(JSON.stringify(data, null, 2))
    })
})

app.put('/venues/:id', function(req, res, next) {
    console.log(req.body)
    dal.updateVenue(req.body, function(err, data) {
        if (err) {
            var responseError = BuildResponseError(err)
            return next(new HTTPError(responseError.status, responseError.message, responseError));
        }
        console.log('Call successful.  Venue information updated', data)
        res.append('Content-type', 'application/json')
        res.status(201).send(JSON.stringify(data, null, 2))
    })
})
app.put('/cities/:id', function(req, res, next) {
    console.log(req.body)
    dal.updateCity(req.body, function(err, data) {
        if (err) {
            var responseError = BuildResponseError(err)
            return next(new HTTPError(responseError.status, responseError.message, responseError));
        }
        console.log('Call successful.  City information updated', data)
        res.append('Content-type', 'application/json')
        res.status(201).send(JSON.stringify(data, null, 2))
    })
})

app.delete('/city/:id', function(req, res, next) {
    console.log(req.body)
    dal.deleteCity(req.body, function(err, data) {
        if (err) {
            var responseError = BuildResponseError(err)
            return next(new HTTPError(responseError.status, responseError.message, responseError));
        }
        console.log('Call successful.  City record deleted', data)
        res.append('Content-type', 'application/json')
        res.status(201).send(JSON.stringify(data, null, 2))
    })
})
app.delete('/venues/:id', function(req, res, next) {
    console.log(req.body)
    dal.deleteVenue(req.body, function(err, data) {
        if (err) {
            var responseError = BuildResponseError(err)
            return next(new HTTPError(responseError.status, responseError.message, responseError));
        }
        console.log('Call successful.  Venue record deleted', data)
        res.append('Content-type', 'application/json')
        res.status(201).send(JSON.stringify(data, null, 2))
    })
})

app.listen(4000, function() {
  console.log('Example app listening on port 4000')
})
