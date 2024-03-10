const express = require('express')
const app = express()
const cors = require('cors')
const PORT = 8000
const server = require("http").createServer(app)

const route = require('./route')
app.use(express.json());
app.use(cors());
app.use('/api', route)



server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
  });
  