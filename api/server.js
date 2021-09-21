const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const path = require("path");
const imagesRouter = require("./routes/imageRouter");

const server = express();
server.use(express.static(path.join(__dirname, "../client/build")));
server.use(express.json());
server.use(helmet());
server.use(cors());

server.get("/api", (req, res) => {
  res.end("API up and running.");
});
server.use("/api/images", imagesRouter);
server.use("*", (_, res) => {
  res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});
server.use((err, req, res, next /*eslint-disable-line */) => {
  res.status(err.status || 500).json({
    note: "Houston, we have a problem!!!",
    message: err.message,
    stack: err.stack,
  });
});
// const db = require('./data/db-config')
// function getAllUsers() { return db('users') }

// async function insertUser(user) {
//   // WITH POSTGRES WE CAN PASS A "RETURNING ARRAY" AS 2ND ARGUMENT TO knex.insert/update
//   // AND OBTAIN WHATEVER COLUMNS WE NEED FROM THE NEWLY CREATED/UPDATED RECORD
//   // UNLIKE SQLITE WHICH FORCES US DO DO A 2ND DB CALL
//   const [newUserObject] = await db('users').insert(user, ['user_id', 'username', 'password'])
//   return newUserObject // { user_id: 7, username: 'foo', password: 'xxxxxxx' }
// }
// server.get('/api/users', async (req, res) => {
//   res.json(await getAllUsers())
// })

// server.post('/api/users', async (req, res) => {
//   res.status(201).json(await insertUser(req.body))
// })

module.exports = server;
