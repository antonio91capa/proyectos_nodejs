var express = require('express');

var router = express.Router();
var con = require('../lib/db');

/* ------------ Show all books ----------------- */
router.get('/', function (req, res, next) {
    //res.send('Welcome to NodeJs - Mysql - Express')
    con.query('SELECT * FROM books ORDER BY id DESC', function (err, rows) {
        if (err) {
            req.flash('error', err);
            res.render('books', { data: '' });
        } else {
            res.render('books', { data: rows });
        }
    });
});

/* ------------- Display add book page --------------- */
router.get('/add', function (req, res, next) {
    res.render('books/add', {
        name: '',
        author: ''
    });
});

/* -------------------- Add new book -------------------- */
router.post('/add', function (req, res, next) {
    let name = req.body.name;
    let author = req.body.author;
    let errors = false;

    if (name.length === 0 || author.length === 0) {
        errors = true;

        req.flash('error', "Please enter name and author");
        res.render('books/add', {
            name: name,
            author: author
        });
    }

    if (!errors) {
        var form_data = {
            name: name,
            author: author
        }

        con.query('INSERT INTO books SET ?', form_data, function (err, result) {
            if (err) {
                req.flash('error', err);
                res.render('books/add', {
                    name: form_data.name,
                    author: form_data.author
                });
            } else {
                req.flash('success', 'Book inserted');
                res.redirect('/books');
            }
        });
    }
});

/* ---------------------- Display edit book page -------------------- */
router.get('/edit/(:id)', function (req, res, next) {
    let id = req.params.id;

    con.query('SELECT * FROM books WHERE id=' + id, function (err, rows, fields) {
        if (err) {
            req.flash('error', 'Book not found');
            res.render('/books');
        } else {
            res.render('books/edit', {
                title: 'Edit book',
                id: rows[0].id,
                name: rows[0].name,
                author: rows[0].author
            });
        }
    });
});

/* ------------------Update book data --------------------------- */
router.post('/update/:id', function (req, res, next) {
    let id = req.params.id;
    let name = req.body.name;
    let author = req.body.author;
    let errors = false;

    if (name.length === 0 || author.length === 0) {
        errors = true;
        req.flash('error', 'Please enter name and author');
        res.render('books/edit', {
            id: req.params.id,
            name: name,
            author: author
        });
    }

    if (!errors) {
        var form_data = {
            name: name,
            author: author
        }

        con.query('UPDATE books SET ? WHERE id=' + id, form_data, function (err, result) {
            if (err) {
                req.flash('error', err);
                res.render('books/edit', {
                    id: req.params.id,
                    name: form_data.name,
                    author: form_data.author
                });
            } else {
                req.flash('success', 'Book successfully updated');
                res.redirect('/books');
            }
        });
    }
});

/* -------------------- Delete Book ------------------------ */
router.get('/delete/(:id)', function (req, res, next) {
    let id = req.params.id;

    con.query('DELETE FROM books WHERE id=' + id, function (err, result) {
        if (err) {
            req.flash('error', err);
            res.render('/books');
        } else {
            req.flash('success', 'Book successfully deleted');
            res.redirect('/books');
        }
    });
});

module.exports = router;