const PouchDB = require('pouchdb-http')
const {
    prop
} = require('ramda')
const db = new PouchDB('http://127.0.0.1:5984/concerts-api/')


function update(doc, cb) {
    console.log(doc)
    if (prop('_rev')(doc) === undefined || prop('_id')(doc) === undefined) {
        return cb(new Error('400 _rev or _id is missing'))
    }
    db.put(doc, function(err, res) {
        if (err) {
            return cb(err)
        }
        if (res) {
            return cb(null, res)
        }
    })

}

function updateCity(doc, cb) {
    update(doc, cb)
}

function updateVenue(doc, cb) {
    update(doc, cb)
}

module.exports = {
    venue: updateVenue,
    city: updateCity
}
