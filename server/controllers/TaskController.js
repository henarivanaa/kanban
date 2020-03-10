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
}

module.exports = TaskController