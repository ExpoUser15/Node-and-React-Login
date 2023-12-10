const { query } = require('../functions/query'); 
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
  try {
    bcrypt.hash(req.body.password, 10)
    .then(async hash => {
      const object = {
        username: req.body.username,
        password: hash,
        email: req.body.email
      }
      await query.createUser(object);
      res.json({
        status: "Success",
        message: "Data Stored Successfully"
      }) 
    })
    .catch(err => console.log(err));
  } catch (error) {
    res.status(500).json({
      status: "Error",
      message: "Internal Server Error"
    })
  }
};

const fetchUser = async (req, res) => {
  try {
    const data = await query.getUser();
    res.json({
      status: "Success",
      data
    });
  } catch (error) {
    res.status(500).json({
      status: "Error",
      message: "Internal Server Error"
    })
  } 
}

const login = async (req, res) => {
  try {
    const {username} = req.body;
    const data = await query.findUser(username);
    if(!data[0]){
      return res.json({
        status: "Error",
        message: "Wrong Username"
      })
    }
    bcrypt.compare(req.body.password, data[0].password)
    .then(async result => {
      if(!result){
        return res.json({
          status: "Error",
          message: "Wrong Password"
        })
      }
      const id = data[0].username;
      const token = jwt.sign({id}, "shhh", { expiresIn: '5m' })
      res.cookie("token", token)
      return res.json({
        status: "Success",
      });
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "Error",
      message: "Internal Server Error"
    })
  }
}

const auth = (req, res) => {
  const token = req.cookies.token;
    if(!token) {
      return res.status(401).json({
        message: "You are unauthorized"
      }); // unauthorized
    }
    jwt.verify(token, "shhh", async (err, decoded) => {
        if(err) {
          if(err.name === "TokenExpiredError"){
            res.clearCookie("token");
            return res.status(403).json({
                status: "Forbidden",
                message: "Your Session Token has expired. Please login again."
            }); // Forbidden
          }
          return res.status(500).json({
            status: "JWT Error",
            message: "An error occurred in token verification. Please contact the administrator."
        });
        }
        const data = await query.findUser(decoded.id);
        res.json({
          status: "Authenticated",
          username: data[0].username
        });
    })
}

module.exports = {
  register,
  fetchUser,
  login,
  auth,
};