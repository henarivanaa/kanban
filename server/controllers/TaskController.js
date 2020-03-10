const { User, Task } = require('../models')

class TaskController {
    static getAllTask = (req, res, next) => {
        let UserId = req.userData.id
        Task
            .findAll({ where: { UserId } })
            .then(tasks => {
                res.status(200).json(tasks)
            })
            .catch(err => {
                next(err)
            })
    }

    static addTask = (req, res, next) => {
        let { title, category } = req.body
        let UserId = req.userData.id
        let newTask = {
            title,
            category,
            UserId
        }
        Task
            .create(newTask)
            .then(task => {
                res.status(201).json(task)
            })
            .catch(err => {
                next(err)
            })
    }

    static updateTask = (req, res, next) => {
        let { title, category } = req.body
        let TaskId = req.params.id
        let edited = {
            title,
            category
        }
        Task
            .update(edited, { where: { id : TaskId } })
            .then(task => {
                res.status(200).json(task)
            })
            .catch(err => {
                next(err)
            })
    }

    static deleteTask = (req, res, next) => {
        let TaskId = req.params.id
        Task
            .destroy({ where: { id:TaskId } })
            .then(task => {
                res.status(200).json(task)
            })
            .catch(err => {
                next(err)
            })
    }
}

module.exports = TaskController