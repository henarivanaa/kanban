const { User, Task } = require('../models')

class UserController {
    static register = (req, res, next) => {
        let { name, email, password } = req.body
        let newUser = {
            name,
            email,
            password
        }

        User
            .create(newUser)
            .then(user => {
                res.status(201).json(user)
            })
            .catch(err => {
                next(err)
            })
    }

    static login = (req, res, next) => {
        let { email, password } = req.body
        User
            .findOne({ where: { email, password } })
    }
}

module.exports = UserController