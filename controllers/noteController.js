const Note = require('../models/notes');

// Homepage
const note_index = (req,res) => {
    Note.find().sort({createdAt : -1})
    .then((result) => {
        res.render('index', {page: 'Home', notes: result});
    })
    .catch((err) => {
        console.log(err);
    })
};

// Category Sort
const note_category = (req,res) => {
    Note.find().sort({category : 1})
    .then((result) => {
        res.render('index', {page: 'Home', notes: result});
    })
    .catch((err) => {
        console.log(err);
    })
};

// Title Sort
const note_title = (req,res) => {
    Note.find().sort({title : 1})
    .then((result) => {
        res.render('index', {page: 'Home', notes: result});
    })
    .catch((err) => {
        console.log(err);
    })
};

// Search Note
const note_search = (req,res) => {
    const title = new RegExp(req.query.search,'i');

    Note.find({title:title})
    .then((result) => {
        res.render('notes/search-note', {page: 'Search', notes: result});
    })
    .catch((err) => {
        console.log(err);
    })
};

// Create Note Page
const create_note = (req,res) => {
    res.render('notes/create-note', {page: 'Create Note'});
};

// Post Note to the database
const post_note = (req,res) => {
    const note = new Note(req.body);

    note.save()
    .then((result) => {
        res.redirect('/notes');
    })
    .catch((err) => {
        console.log(err);
    });
};

// Retrieving Note from the database
const note_details = (req,res) => {
    const id = req.params.id;

    Note.findById(id)
    .then((result) => {
        res.render('notes/view-note', {page: 'Details', note: result});
    })
    .catch((err) => {
        console.log(err);
    });
};

// Edit Note Page
const edit_note = (req,res) => {
    const id = req.params.id;

    Note.findById(id)
    .then((result) => {
        res.render('notes/edit-note', {page: 'Edit', note: result});
    })
    .catch((err) => {
        console.log(err);
    });
};

// Update Note
const update_note = (req,res) => {
    const id = req.params.id;
    const body = req.body;
    
    Note.findByIdAndUpdate(id, body, {new: true})
    .then(() => {
        Note.findById(id)
        .then((result) => {
            res.render('notes/view-note', {page: 'Details', note: result});
         })
        .catch((err) => {
            console.log(err);
        });
    })
    .catch((err) => {
        console.log(err);
    });
};

// Delete Note
const note_delete = (req,res) => {
    const id = req.params.id;

    Note.findByIdAndDelete(id)
    .then((result) => {
        res.json({redirect:'/notes'})
    })
    .catch((err) => {
        console.log(err);
    });
};

module.exports = {
    note_index,
    note_category,
    note_title,
    note_search,
    create_note,
    post_note,
    note_details,
    edit_note,
    update_note,
    note_delete
};