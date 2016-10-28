
const dalNoSQL = require('./DAL/no-sql.js');

const sortBy = 'lastNameView'
const startKey = '';
const limit = 10;

// dalNoSQL.listPersons(sortBy, startKey, limit, function callback(err, data) {
//     if (err) {
//       console.log(err)
//       }
//     if (data) {
//         console.log(JSON.stringify(data, null, 2))
//     }
// });


dalNoSQL.listPersons(sortBy, 'Johnsonperson_gary.johnson1971@gmail.com', limit, function callback(err, data) {
    if (err) {
      console.log(err)
      }
    if (data) {
        console.log(JSON.stringify(data, null, 2))
    }
});
