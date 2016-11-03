
const PouchDB = require('pouchdb-http')
const dal = require('./DAL/no-sql.js')
const db = new PouchDB('http://aplchian:alex363375@127.0.0.1:5984/concerts/')

// var cb = function(err,res){
//   if(err){
//     return console.log(err.message)
//   }
//   if(res){
//     return console.log(res)
//   }
// }
//
// var city = {
//   "_rev": "3-b7524bb68b1865ab261cda585d0ba8e3",
//   "name": "Athens",
//   "state": "GA",
//   "population": 420,
//   "type": "city",
//   "city_type": "urban"
// }
//
// var venue = {
//   "_rev": "1-5c3c148a58da5d31ed2b36aa867ed179",
//   "name": "Aisle 5",
//   "city": "Atlanta",
//   "state": "GA",
//   "capacity": 500,
//   "type": "venue",
//   "venue_type": "indoor"
// }
//
// dal.venuesByState('venue_GA_Atlanta_Aisle_5',2,cb)
