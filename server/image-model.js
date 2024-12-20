const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  projectName: { type: String, required: true },
  image: { type: String, required: true },
}, { timestamps: true });

const Image = mongoose.model('Image', imageSchema);

module.exports = Image;