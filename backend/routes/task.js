const router = require('express').Router();
let Task = require('../models/task.model');

router.route('/').get((req, res) => {
    Task.find()
        .exec()
        .then(tasks => res.json(tasks))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Task.find({userid: req.params.id})
        .exec()
        .then(task => res.json(task))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    // console.log(req.body.state);
    Task.findById(req.params.id)
        .then(task => {
            task.taskid = req.body.taskid,
            task.description = req.body.description,
            task.state = req.body.state,
            task.userid = req.body.userid
            task.save()
                .then(() => res.json('Task Updated!'))
                .catch(err => res.json('Error: ' + err))
        })
        .catch(err => res.json('Error: ' + err))
});

router.route('/check/:id').get((req, res) => {
    Task.findById(req.params.id)
        .exec()
        .then(tasks => res.json(tasks))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add/:id').post((req, res, next) => {
    const newTask = new Task({
        taskid: req.body.taskid,
        description: req.body.description,
        state: req.body.state,
        userid: req.params.id
    });
    newTask.save()
        .then(() => res.json('Task added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Task.findByIdAndDelete(req.params.id)
        .exec()
        .then(() => {
            res.json('Task Deleted!')
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;