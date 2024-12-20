const mongoose = require('mongoose');

const ContactMessageSchema = new mongoose.Schema({
  email: { type: String, required: true },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const ContactMessage = mongoose.model('ContactMessage', ContactMessageSchema);

module.exports = ContactMessage;