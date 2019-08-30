var express = require("express")
var app = express()
var db = require("./database.js")

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var HTTP_PORT = 8000

// Start server
app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%",HTTP_PORT))
});

app.use(express.static('public'))

app.get("/gym", (req, res, next) => {
    //var sql = "select * from users"
    var sql = "SELECT users.id, users.firstname, users.lastname, practice.name, practice.pdate, practice.result FROM users INNER JOIN user_practice on user_practice.user_id = users.id inner join practice on practice.id = user_practice.id"
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data":rows
        })
      });
  });
/*
  app.get("/gym", (req, res, next) => {
    var sql = "select * from practice"
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data":rows
        })
      });
  });
*/
  app.post("/add", (req, res, next) => {
    console.log(req.body.name);
    var sql = "INSERT INTO practice (name,pdate,result) values(practice)"
    db.run(sql, [req.body.name,req.body.pdate,req.body.result], function(err) {
      console.log(this.lastID);
      
    if (err) {
        res.status(400).json({"error":err.message});
        return;
    }

    res.json({
    "message":"ratt"
    })
  });//end of db run
});//end of post

app.get("/deleter/:id", (req, res, next) => {
 console.log("id" + req.params.id)
 var id="req.params.id, practice.name"
 db.run(`DELETE FROM practice WHERE id=?`, id, function(err) {
  if (err) {
    return console.error(err.message);
  }



 res.json({
           "message":"success"
      })
    });




  
  

//   app.post("/add", (req, res, next) => {
//   console.log("add result" + req.body.result);
//   db.run('INSERT INTO practice (result) VALUES (?)', [req.body.result], (err, rows) => {
//     if (err) {
//       res.status(400).json({"error":err.message});
//       return;
//     }
//     res.json({
//         "message":"success",
//     })
//   }); 
// });



app.post("/users", (req, res, next) => {
  console.log(req.body.namn);
  db.run('INSERT INTO users (firstname) VALUES ("Sandra")', [], (err, rows) => {
    if (err) {
      res.status(400).json({"error":err.message});
      return;
    }
    res.json({
        "message":"success",
    })
  }); 
});
app.post("/practice", (req, res, next) => {
  console.log(req.body.namn);
  db.run('INSERT INTO practice (name) VALUES ("stångrodd")', [], (err, rows) => {
    if (err) {
      res.status(400).json({"error":err.message});
      return;
    }
    res.json({
        "message":"success",
    })
  }); 
});


  app.get("/gym", (req, res, next) => {
    var sql = "select * from user practice"
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data":rows
        })
      });
  });

// Root path
app.get("/", (req, res, next) => {
    res.json({"message":"Ok"})
});
})