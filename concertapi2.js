const path = require('path');
const PouchDB = require('pouchdb-http');
PouchDB.plugin(require('pouchdb-mapreduce'));
const fetchConfig = require('zero-config');

var config = fetchConfig(path.join(__dirname, '..'), {
    dcValue: 'test'
});
const urlFormat = require('url').format;

const db = new PouchDB('http://localhost:5984/concert2')


function createPerson(data, callback) {
    // Call to couch retrieving a document with the given _id value.
    if (typeof data == "undefined" || data === null) {
        return callback(new Error('400Missing data for create'));
    } else if (data.hasOwnProperty('_id') === true) {
        return callback(new Error('400Unnecessary id property within data.'));
    } else if (data.hasOwnProperty('_rev') === true) {
        return callback(new Error('400Unnecessary rev property within data'));
    } else if (data.hasOwnProperty('lastName') !== true) {
        return callback(new Error('400Missing lastName property within data'));
    } else if (data.hasOwnProperty('firstName') !== true) {
        return callback(new Error('400Missing firstName property within data'));
    } else if (data.hasOwnProperty('email') !== true) {
        return callback(new Error('400Missing email property within data'));
    } else {

        data.active = true;
        data.type = 'person';
        data._id = 'person_' + data.email;

        //////     PROMISES
        // db.put(data).then(function(response) {
        //     return callback(null, response);
        // }).catch(function(err) {
        //     return callback(err);
        // });

        //////     CALLBACKS
        db.put(data, function(err, response) {
            if (err) return callback(err);
            if (response) return callback(null, response);
        });
    }
}

var callback = function (err, data) {
   if (err) return console.log(err)
   console.log(data)
}

createPerson({
    lastName: "Ottinger",
    firstName: "William",
    email: "tripott@gmail.com"
}, callback)
