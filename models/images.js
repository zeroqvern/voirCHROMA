const mongoose = require('mongoose');
const schema = mongoose.Schema;

//create scheme
const ImageSchema = new schema ({
    id: { type: String},
    img_url: { type: String},
    color1: { type: String },
    color2: { type: String },
    color3: { type: String },
    color4: { type: String },
    color5: { type: String },
    color6: { type: String },
});

const Image = mongoose.model('Images', ImageSchema, "Images");
module.exports = Image;
