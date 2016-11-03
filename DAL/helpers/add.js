const PouchDB = require('pouchdb-http')
const {
    forEach,
    prop
} = require('ramda')
const db = new PouchDB('http://127.0.0.1:5984/concerts-api/')

function city(doc, cb) {
    var hasKeys = true
    var status = ''
    const keys = ['name', 'state', 'type']

    function missingKey(item) {
        if (prop(item)(doc) === undefined) {
            hasKeys = false
            status = item
        }
    }

    forEach(missingKey, keys)

    if (!hasKeys) {
        return cb(new Error(`400Missing ${status} property within data`))
    }

    if (prop('_rev')(doc)) {
        return cb(new Error('400 _rev not allowed'))
    }

    if (prop('_id')(doc)) {
        return cb(new Error('400 _id not allowed'))
    }
    doc._id = "city_" + doc.state + '_' + doc.name.replace(/ /g, "_");
    console.log(doc)

    db.put(doc, function(err, res) {
        if (err) {
            return cb(err, null)
        }
        if (res) {
            cb(null, res)
        }
    })
}

function venue(doc, cb) {
    var hasKeys = true
    var status = ''
    const keys = ['name', 'state', 'city', 'type']

    function missingKey(item) {
        if (prop(item)(doc) === undefined) {
            hasKeys = false
            status = item
        }
    }

    forEach(missingKey, keys)

    if (!hasKeys) {
        return cb(new Error(`400Missing ${status} property within data`))
    }

    if (prop('_rev')(doc)) {
        return cb(new Error('400 _rev not allowed'))
    }

    if (prop('_id')(doc)) {
        return cb(new Error('400 _id not allowed'))
    }

    doc._id = "venue_" + doc.state + '_' + doc.city.replace(/ /g, "_") + "_" + doc.name.replace(/ /g, "_")
    console.log(doc)

    db.put(doc, function(err, res) {
        if (err) {
            console.log('ERROR!')
            return cb(err.message, null)
        }
        if (res) {
            cb(null, res)
        }
    })
}

module.exports = {
    city: city,
    venue: venue
}
