const mongoose = require("mongoose");

const state = {
	myModel: null
}

const getModel = () => {

  if (!state.myModel) {
    //Process the Schema
    const mySchema = new mongoose.Schema({
      title: String,
      description: String,
      content: String,
      date: { type: Date, default: Date.now },
      userId: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User'},
      image: String
    });
    //Create A Model
    state.myModel = mongoose.model('Post', mySchema);

    return state.myModel;
    
  } else {
    return state.myModel;
  }
	
}

module.exports = { getModel }