const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create scheme
const ColorSchema = new Schema ({
    id: { type: String },
    img_id: { type: String },
    name: { type: String },
    hex: { type: String },
    rgb:{ type: String },
    hsl:{ type: String },
    hsv:{ type: String },
    cmyk:{ type: String },
    img_bare: { type: String }
});

const Color = mongoose.model('Colors', ColorSchema, "Colors");
module.exports = Color;
