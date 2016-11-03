/*jshint esversion: 6 */
const path = require('path');
const PouchDB = require('pouchdb-http');
PouchDB.plugin(require('pouchdb-mapreduce'));
const fetchConfig = require('zero-config');
const {
    forEach,
    prop
} = require('ramda')
var config = fetchConfig(path.join(__dirname, '..'), {
    dcValue: 'test'
});
const urlFormat = require('url').format;
const db = new PouchDB('http://127.0.0.1:5984/concerts-api/')
const create = require('./helpers/add.js')
const getDocs = require('./helpers/get.js')
const remove = require('./helpers/remove.js')
const update = require('./helpers/update.js')
const dbQuery = require('./helpers/dbQuery.js')




var dal = {
    createCity: create.city,
    createVenue: create.venue,
    getVenue: getDocs.venue,
    getCity: getDocs.city,
    deleteCity: remove.city,
    deleteVenue: remove.venue,
    updateCity: update.city,
    updateVenue: update.venue,
    venuesByCapacity: dbQuery.queryCapacity,
    citiesByState: dbQuery.citiesByState,
    venuesByState: dbQuery.venuesByState,
    outdoorVenues: dbQuery.outdoorVenues,
    indoorVenues: dbQuery.indoorVenues,
}

module.exports = dal;
