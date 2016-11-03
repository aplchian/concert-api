const PouchDB = require('pouchdb-http')
const {
    prop,
    map,
    curry,
    __
} = require('ramda')
const db = new PouchDB('http://127.0.0.1:5984/concerts-api/')

function addSortKey(item) {
    item.doc.startKey = item.id
    return item.doc
}


function query(sortBy, sortToken, limit, cb, sortKey) {
    var options = {
        startkey: sortToken,
        limit: limit,
        include_docs: true
    }

    db.query(sortBy, options, function(err, res) {
        if (err) {
            return cb(err)
        }
        if (res) {
            return cb(null, map(sortKey, res.rows))
        }
    })
}

function queryCapacity(sortToken, limit, cb) {
    function addSortKey(item) {
        item.doc.startKey = item.key
        return item.doc
    }
    query('capacity', sortToken, limit, cb, addSortKey)
}


function queryById(sortToken, limit, cb, view) {
    function addSortKey(item) {
        item.doc.startKey = item.id
        return item.doc
    }
    query(view, sortToken, limit, cb, addSortKey)
}


var curriedQueryById = curry(queryById)





module.exports = {
    queryCapacity: queryCapacity,
    outdoorVenues: curriedQueryById(__, __, __, 'venues-outdoor'),
    indoorVenues: curriedQueryById(__, __, __, 'venues-indoor'),
    citiesByState: curriedQueryById(__, __, __, 'cities'),
    venuesByState: curriedQueryById(__, __, __, 'venues')
}
