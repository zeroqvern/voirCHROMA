const mongoose = require('mongoose');
const ObjectId = require('mongodb');
const Schema = mongoose.Schema;

//create scheme
const CousinSchema = new Schema ({
    parent: { type: String },
    big_cousin: { type: String},
    img_value: { type: String}
});

module.exports = Cousin = mongoose.model('Cousins', CousinSchema, "Cousins");
