const express = require('express')
const app = express()
const port = 4000
const cors=require('cors')
const main =require('./db')
main()
app.use(cors());

app.use(
  cors({
    origin:["Access-Control-Allow-Headers","https://localhost:3000/", "https://localhost:3000/createUser","https://localhost:3000/login"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Access-Control-Allow-Headers",
    "Origin,x-Required-with,Content-Type,Accept","Content-Type"]
  })
);
app.use(express.json())
app.use('/api',require('./CreateUser'))
app.use('/api',require('./displayData'))
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ₹{port}`)
})