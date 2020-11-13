const sqlite3 = require("sqlite3").verbose()
const express = require('express')
const moment = require('moment')
const path = require("path")
const cors = require('cors')
const app = express()

app.use(cors())

const PORT = 3000

app.use(express.json()) 
app.use(express.urlencoded({ extended: false })) 

const dbName = path.join(__dirname, "db-list.sqlite")

const db = new sqlite3.Database(dbName, err => {
  if (err) {
    return console.error(err.message);
  }
  console.log(`2. Successful connection to the database ${dbName}`)
  const sql_create = `
        CREATE TABLE IF NOT EXISTS List (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            imei VARCHAR(15) NOT NULL,
            imsi VARCHAR(15) NOT NULL,
            msisdn VARCHAR(7) NOT NULL,
            created INTEGER NOT NULL,
            updated INTEGER 
        );`;
    
  db.run(sql_create, err => {
    if (err) {
      return console.error(err.message);
    }
    console.log("3. Successful creation of the 'List' table")
  })
  db.all("select count() as num from List;", [], (err,rows) => {
    if (err) {
      return console.error(err.message);
    }
    if(rows[0].num == 0) {
      const sql_insert = `INSERT INTO List 
        (imei, imsi, msisdn, created)  VALUES
        ('000000000000001', '000000000000001', '700000000001', strftime('%d.%m.%Y %H:%M','now')),
        ('000000000000002', '000000000000002', '700000000002', strftime('%d.%m.%Y %H:%M','now')),
        ('000000000000003', '000000000000003', '700000000003', strftime('%d.%m.%Y %H:%M','now')),
        ('000000000000004', '000000000000004', '700000000004', strftime('%d.%m.%Y %H:%M','now')),
        ('000000000000005', '000000000000005', '700000000005', strftime('%d.%m.%Y %H:%M','now')),
        ('000000000000006', '000000000000006', '700000000006', strftime('%d.%m.%Y %H:%M','now')),
        ('000000000000007', '000000000000007', '700000000007', strftime('%d.%m.%Y %H:%M','now')),
        ('000000000000008', '000000000000008', '700000000008', strftime('%d.%m.%Y %H:%M','now')),
        ('000000000000009', '000000000000009', '700000000009', strftime('%d.%m.%Y %H:%M','now')),
        ('000000000000010', '000000000000010', '700000000010', strftime('%d.%m.%Y %H:%M','now')),
        ('000000000000011', '000000000000011', '700000000011', strftime('%d.%m.%Y %H:%M','now')),
        ('000000000000012', '000000000000012', '700000000012', strftime('%d.%m.%Y %H:%M','now')),
        ('000000000000013', '000000000000013', '700000000013', strftime('%d.%m.%Y %H:%M','now')),
        ('000000000000014', '000000000000014', '700000000014', strftime('%d.%m.%Y %H:%M','now')),
        ('000000000000015', '000000000000015', '700000000015', strftime('%d.%m.%Y %H:%M','now')),
        ('000000000000016', '000000000000016', '700000000016', strftime('%d.%m.%Y %H:%M','now')),
        ('000000000000017', '000000000000017', '700000000017', strftime('%d.%m.%Y %H:%M','now')),
        ('000000000000018', '000000000000018', '700000000018', strftime('%d.%m.%Y %H:%M','now')),
        ('000000000000019', '000000000000019', '700000000019', strftime('%d.%m.%Y %H:%M','now')),
        ('000000000000020', '000000000000020', '700000000020', strftime('%d.%m.%Y %H:%M','now'));`
      db.run(sql_insert, err => {
        if (err) {
          return console.error(err.message);
        }
        console.log("4. Successful creation List 20 Items");
      })  
    }
  })
})

// ----------------------------- END POINTS ------------------------------------ //

//GET/id
app.get('/api/list/:id', (req, res) => {
  var sql = "select * from List where id = ?"
  var params = [req.params.id]
  db.get(sql, params, (err, row) => {
      if (err) {
        res.status(400).json({"error":err.message})
        return;
      }
      res.status(200).json(row)
    });
});

//GET
app.get('/api/list', (req, res) => {
    const sql = "SELECT * FROM List ORDER BY id DESC"
    db.all(sql, [], (err, rows) => {
      if (err) {
        return console.error(err.message)
      }
      res.status(200).json(rows)
    })
})

//POST
app.post("/api/list", (req, res, next) => {
  const errors=[]
  if (!req.body.imei){
      errors.push("No imei specified");
  }
  if (!req.body.imsi){
      errors.push("No imsi specified");
  }
  if (errors.length){
      res.status(400).json({"error":errors.join(",")})
      return;
  }
  const data = {
      imei: req.body.imei,
      imsi: req.body.imsi,
      msisdn: req.body.msisdn,
      created: moment(Date.now()).format("DD.MM.YYYY HH:mm")
  }
  const sql ='INSERT INTO List  (imei, imsi, msisdn, created) VALUES (?, ?, ?, ?)'
  const params =[data.imei, data.imsi, data.msisdn, data.created]
  db.run(sql, params, function (err, result) {
      if (err){
          res.status(400).json({"error": err.message})
          return;
      }
      res.json({
          "message": "success",
          "data": data,
          "id" : this.lastID
      })
  });
})

//PATCH
app.patch('/api/list/:id', (req, res, next) => {
  let data = {
      imei: req.body.imei,
      imsi: req.body.imsi,
      msisdn: req.body.msisdn,
      updated: moment(Date.now()).format("DD.MM.YYYY HH:mm")
    }
  db.run(
      `UPDATE List SET 
        imei = COALESCE(?,imei), 
        imsi = COALESCE(?,imsi), 
        msisdn = COALESCE(?,msisdn),
        updated = COALESCE(?,updated) 
      WHERE id = ?`,
      [data.imei, data.imsi, data.msisdn, data.updated, req.params.id],
      function (err, result) {
        if (err){
          res.status(400).json({"error": res.message})
          return;
        }

      res.json({
        message: "success",
        data: data,
        "id": req.params.id,
        changes: this.changes
      })
    })
})

//DELETE
app.delete("/api/list/:id", (req, res, next) => {
  db.run('DELETE FROM List WHERE id = ?',  req.params.id,
    function (err, result) {
      if (err){
        res.status(400).json({"error": res.message})
        return;
     }
     res.json({"message":"deleted", "id": req.params.id, changes: this.changes})
  });
})

// Root endpoint
app.get("/", (req, res, next) => {
  res.json({"message":"Ok"})
})

app.listen(PORT, () => {
    console.log(`1. Server has been started on port ${PORT}...`)
})

