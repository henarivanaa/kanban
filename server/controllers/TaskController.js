const { User, Task } = require('../models')

class TaskController {
    static getAllTask = async (req, res, next) => {
        try {
            let UserId = req.userData.id
            let tasks = await Task.findAll({ where: { UserId } })
            res.status(200).json(tasks)
        } catch (error) {
            next(err)
        }
    }

    static addTask = async (req, res, next) => {
        try {
            let { title, category } = req.body
            let UserId = req.userData.id
            let newTask = {
                title,
                category,
                UserId
            }
            let task = await Task.create(newTask)
            res.status(201).json(task)
        } catch (error) {
            next(error)
        }
    }

    static updateTask = async (req, res, next) => {
        try {
            let { title, category } = req.body
            let TaskId = req.params.id
            let edited = {
                title,
                category
            }
            let task = await Task.update(edited, { where: { id: TaskId } })
            res.status(200).json(task)
        } catch (error) {
            next(error)
        }
    }

    static deleteTask = async (req, res, next) => {
        try {
            let TaskId = req.params.id
            let task = await Task.destroy({ where: { id: TaskId } })
            res.status(200).json(task)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = TaskController