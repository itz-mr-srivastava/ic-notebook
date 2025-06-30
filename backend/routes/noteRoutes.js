const express = require('express');
const jwt = require('jsonwebtoken');
const Note = require('../models/Note');
const router = express.Router();

function verifyToken(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) return res.sendStatus(403);
    jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
        if (err) return res.sendStatus(403);
        req.userId = data.id;
        next();
    });
}

router.use(verifyToken);

router.get('/', async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    const notes = await Note.find({ userId: req.userId })
        .skip((page - 1) * limit)
        .limit(parseInt(limit));
    res.json(notes);
});

router.post('/', async (req, res) => {
    const { title, content, tags, pinned } = req.body;
    const note = await Note.create({ userId: req.userId, title, content, tags, pinned });
    res.json(note);
});

router.put('/:id', async (req, res) => {
    const updatedNote = await Note.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedNote);
});

router.delete('/:id', async (req, res) => {
    await Note.findByIdAndDelete(req.params.id);
    res.json({ success: true });
});

module.exports = router;
