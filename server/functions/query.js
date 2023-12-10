const mongoose = require('mongoose');
const UserSchema = require('../models/userSchema');
require('../config/db');

class Query {

  async createUser(data){
    const create = await mongoose.model('users', UserSchema).create(data);
    return create;
  }

  async getUser(){
    const get = await mongoose.model("users", UserSchema).find({}, 'username email')
    return get;
  }

  async findUser(username){
    const get = await mongoose.model("users", UserSchema).find({username});
    return get;
  }
  
}

const query = new Query();

module.exports = {
 query
};
