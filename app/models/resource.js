
  var ResourceSchema, Schema, mongoose;

  mongoose = require('mongoose');

  Schema = mongoose.Schema;

  ResourceSchema = new Schema({
    name: String
  });

  module.exports = mongoose.model('Resource', ResourceSchema);
