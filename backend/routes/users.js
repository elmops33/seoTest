const router = require('express').Router();
const mongoose = require('mongoose');
let User = require('../models/user.model');

router.route('/').get((req, res) => {
    User.find()
        .exec()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    User.findById(req.params.id)
        .exec()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res, next) => {
    const newUser = new User({
        username: req.body.username,
        userid: req.body.userid
    });

    newUser.save()
        .then(() => res.json('User added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    User.findById(req.params.id)
        .then(user => {
            user.userid = req.body.userid,
            user.username = req.body.username
            user.save()
                .then(() => res.json('User Updated!'))
                .catch(err => res.json('Error: ' + err))
        })
        .catch(err => res.json('Error: ' + err))

});

router.route('/:id').delete((req, res) => {
    User.findByIdAndDelete(req.params.id)
        .then(() => {
            res.json('User Deleted!')
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;