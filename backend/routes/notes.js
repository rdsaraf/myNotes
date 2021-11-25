const express = require('express');
const router = express.Router();
const fetchUser = require('../middleware/fetchuser');
const Notes = require('../models/Notes');
const { body, validationResult } = require('express-validator');

//Get notes of logged in user : login required Get:"/api/notes/fetchallnotes"
router.get('/fetchallnotes', fetchUser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error!");
    }
})

//Add notes of logged in user : login required Get:"/api/notes/addnote"
router.post('/addnote', fetchUser, [
    body('title', "Enter a valid title").isLength({ min: 3 }),
    body('description', "description must be atleast 5 characters").isLength({ min: 5 }),
], async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        //If error occured return bad request
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const note = new Notes({
            title, description, tag, user: req.user.id
        })
        const savedNotes = await note.save();
        res.json(savedNotes);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error!");
    }
})

//Update notes of logged in user : login required Get:"/api/notes/updatenote"
router.put('/updatenote/:id', fetchUser, async (req, res) => {
    const { title, description, tag } = req.body;
    try {
        const newNote = {};
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };
        let note = await Notes.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Not found");
        }
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not allowed");
        }
        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
        res.json({ note });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error!");
    }
})

//Delete notes of logged in user : login required Get:"/api/notes/delnote"
router.delete('/delnote/:id', fetchUser, async (req, res) => {
    const { title, description, tag } = req.body;
    try {
        let note = await Notes.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Not found");
        }
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not allowed");
        }
        note = await Notes.findByIdAndDelete(req.params.id);
        res.json("Success : Note has been deleted");
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error!");
    }
})

module.exports = router;