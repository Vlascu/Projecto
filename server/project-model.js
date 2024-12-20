const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  url: {type: String, required: true},
  languages: [{
    name: { type: String },
    percentage: { type: Number }
  }],
 
}, { timestamps: true });

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;