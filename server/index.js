const express = require('express')
const app = express();
const mysql = require('mysql')
const cors = require('cors')

const db = mysql.createPool({
  host: "localhost",
  user:"root",
  password:"java",
  database:"crud"
})

app.use(cors())
app.use(express.json())

app.post('/register', (req, res) => {
  const {name} = req.body;
  const {cost} = req.body;
  const {category} = req.body;

  let sql = `INSERT INTO games (name, cost, category) VALUES ('${name}', '${cost}', '${category}')`;
  db.query(sql,(err, result) =>(
    console.log(err)
  ))
})

app.get("/getcards", (req, res) => {
  let sql = "SELECT * from games";

  db.query(sql, (err, result) => {
    if (err) console.log(err)
    else res.send(result)
  })
});

app.put("/edit", (req, res) => {
  const { id } = req.body;
  const { name } = req.body;
  const { cost } = req.body;
  const { category } = req.body;

  let sql = `UPDATE games SET name='${name}' , cost=?, category=? WHERE id=?`;

  db.query(sql, [cost, category, id], (err, result) => {
    if(err) console.log(err)
    else res.send(result)
  })
})

app.delete('/delete/:id', (req, res) => {
  const { id } = req.params;

  let sql = 'DELETE FROM games WHERE id= ?'
  db.query(sql, id, (err, result) => {
    if(err) console.log(err)
    else res.send(result)
  })
})

app.listen(3001, () => {
  console.log('server is live')
})

