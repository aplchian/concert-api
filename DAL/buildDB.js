const PouchDB = require('pouchdb-http')
const db = new PouchDB('http://127.0.0.1:5984/concerts-api/')
const dal = require('./no-sql.js')
const {
    forEach
} = require('ramda')

var views = [{
    _id: "_design/venues",
    views: {
        "venues": {
            map: function(doc) {
                if (doc.type === "venue") {
                    emit(doc._id)
                }
            }.toString()
        }
    }
}, {
    _id: "_design/capacity",
    views: {
        capacity: {
            map: function(doc) {
                if (doc.type === "venue") {
                    emit(doc.capacity)
                }
            }.toString()
        }
    }
}, {
    _id: "_design/venue-type",
    views: {
        "venue-type": {
            map: function(doc) {
                if (doc.type === "venue") {
                    emit(doc.venue_type)
                }
            }.toString()
        }
    }
}, {
    _id: "_design/cities",
    views: {
        cities: {
            map: function(doc) {
                if (doc.type === "city") {
                    emit(doc._id)
                }
            }.toString()
        }
    }
}, {
    _id: "_design/venues-indoor",
    views: {
        "venues-indoor": {
            map: function(doc) {
                if (doc.venue_type === "indoor") {
                    emit(doc._id)
                }
            }.toString()
        }
    }
}, {
    _id: "_design/venues-outdoor",
    views: {
        "venues-outdoor": {
            map: function(doc) {
                if (doc.venue_type === "outdoor") {
                    emit(doc._id)
                }
            }.toString()
        }
    }
}
]

var venues = [{
    "name": "Ryman Auditorium",
    "city": "Nashville",
    "state": "TN",
    "capacity": 2000,
    "type": "venue",
    "venue_type": "indoor"
}, {
    "name": "Ampitheatre",
    "city": "Atlanta",
    "state": "GA",
    "capacity": 3000,
    "type": "venue",
    "venue_type": "outdoor"
}, {
    "name": "Aisle 5",
    "city": "Atlanta",
    "state": "GA",
    "capacity": 300,
    "type": "venue",
    "venue_type": "indoor"
}, {
    "name": "Music Farm",
    "city": "Charleston",
    "state": "SC",
    "capacity": 800,
    "type": "venue",
    "venue_type": "indoor"
}, {
    "name": "Bonnaroo",
    "city": "Manchester",
    "state": "TN",
    "capacity": 45500,
    "type": "venue",
    "venue_type": "outdoor"
}, {
    "name": "Brooklyn Bowl",
    "city": "Brooklyn",
    "state": "NY",
    "capacity": 900,
    "type": "venue",
    "venue_type": "indoor"
},{
    "name": "My House",
    "city": "Mt. Pleasant",
    "state": "SC",
    "capacity": 40,
    "type": "venue",
    "venue_type": "outdoor"
},

 ]

var cities = [{
        "name": "Athens",
        "state": "GA",
        "population": 1323420,
        "type": "city",
        "city_type": "rural"
    }, {
        "name": "Charleston",
        "state": "SC",
        "population": 23420,
        "type": "city",
        "city_type": "urban"
    }, {
        "name": "Atlanta",
        "state": "GA",
        "population": 234220,
        "type": "city",
        "city_type": "urban"
    }, {
        "name": "Brooklyn",
        "state": "NY",
        "population": 9223420,
        "type": "city",
        "city_type": "urban"
    }, {
        "name": "Awendaw",
        "state": "SC",
        "population": 1220,
        "type": "city",
        "city_type": "rural"
    },

]

const addVenue = function(venue) {
    dal.createVenue(venue, function(err, res) {
        if (err) {
            return console.log(err.message)
        }
        if (res) {
            return console.log(res)
        }
    })
}

const addCity = function(venue) {
    dal.createCity(venue, function(err, res) {
        if (err) {
            return console.log(err.message)
        }
        if (res) {
            return console.log(res)
        }
    })
}

db.bulkDocs(views, function(err, res) {
    if (err) {
        console.log(err.message)
    }
    if (res) {
        console.log(res)
    }
})


forEach(addVenue, venues)
forEach(addCity, cities)
