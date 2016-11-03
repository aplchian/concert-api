const PouchDB = require('pouchdb-http')
const db = new PouchDB('http://127.0.0.1:5984/concerts-api/')

function remove(id, cb) {
    db.get(id, function(err, res) {
        if (err) {
            cb(err, null)
        }
        if (res) {
            db.remove(res, function(err, res) {
                if (err) {
                    return cb(err, null)
                }
                if (res) {
                    return cb(null, res)
                }
            })
        }
    })
}

function venue(id, cb) {
    remove(id, cb)
}

function city(id, cb) {
    remove(id, cb)
}

module.exports = {
    venue: venue,
    city: city
}
