const bcrypt = require('bcrypt');
const mongoose = require("mongoose");

const state = {
	userModel: null
}

const getModel = () => {

  if (!state.userModel) {
    //Process the Schema
    const userSchema = new mongoose.Schema({
      username: {
        type: String,
        required: true
      },
      email: {
        type: String,
        required: true,
        unique: true
      },
      password: {
        type: String,
        required: true
      }
    });

    userSchema.pre('save', function(next) {
      let user = this;
      let saltRounds = 10;

      bcrypt.hash(user.password, saltRounds, function(err, hash) {
        // Store hash in your password DB.
        user.password = hash;
        next();
      });
      
    });

    //Create A Model
    state.userModel = mongoose.model('User', userSchema);

    return state.userModel;

  } else {
    return state.userModel;
  }
	
}

module.exports = { getModel }