const express = require('express');
const noteController = require('../controllers/noteController');

const router = express.Router(); //New instance of router handler

// Homepage
router.get('/', noteController.note_index);

// Category Sort
router.get('/category', noteController.note_category);

// Title Sort
router.get('/title', noteController.note_title);

// Search Note
router.get('/search-note', noteController.note_search);

// Create Note Page
router.get('/create', noteController.create_note);

// Post Note to the database
router.post('/', noteController.post_note);

// Retrieving Note from the database
router.get('/:id', noteController.note_details);

// Edit Note Page
router.get('/edit/:id', noteController.edit_note);

// Update Note
router.post('/edit-post/:id', noteController.update_note);

// Delete Note
router.delete('/:id', noteController.note_delete);

module.exports = router;

