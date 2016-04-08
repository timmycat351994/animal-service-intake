var mongoose = require('mongoose');
var AnimalSchema = new mongoose.Schema({
  _id: String,
  value: Number,
},
{
    collection: 'group_counts'
});

mongoose.model('Animal', AnimalSchema);
