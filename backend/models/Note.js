const mongoose = require('mongoose');
const NoteSchema = new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    title: String,
    content: String,
    tags: [String],
    pinned: Boolean,
    createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Note', NoteSchema);