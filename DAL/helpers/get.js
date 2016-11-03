const PouchDB = require('pouchdb-http')
const {
    forEach,
    prop
} = require('ramda')
const db = new PouchDB('http://127.0.0.1:5984/concerts-api/')

function getDocs(name, cb) {
    db.get(name, {
        all_docs: true
    }, function(err, res) {
        if (err) {
            return cb(err, null)
        }
        if (res) {
            return cb(null, res)
        }
    })
}

function venue(name, cb) {
    getDocs(name, cb)
}

function city(name, cb) {
    getDocs(name, cb)
}

module.exports = {
    venue: venue,
    city: city
}
