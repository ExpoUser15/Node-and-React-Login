const express = require('express');
const cors = require('cors');
const cookieParser = require("cookie-parser");
const router = require('./router/router');
const app = express();
require('./config/db');

app.use(cors({
  origin: ["http://localhost:5173"],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}))

app.use(express.json());
app.use(cookieParser());

app.use('/', router);

app.listen('3000', () => {
  console.log('Server Running on Port 3000');
});
