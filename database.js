var sqlite3 = require('sqlite3').verbose()
//ändra till din egen databas och kolla att filnamnet är rätt importerat i server.js
const DBSOURCE = "gym.db" 


let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
      // Cannot open database
      console.error(err.message)
      throw err
    }else{
        console.log('Connected to the SQlite database.') 
    }
})

module.exports = db