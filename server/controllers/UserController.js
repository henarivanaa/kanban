const { User, Task } = require('../models')
const { generateToken } = require('../helpers/jwt')

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
            .then(user => {
                let id = user.id
                let email = user.email
                let token = generateToken({ id, email }, process.env.JWT_SECRET)
                res.status(200).json(token)
            })
            .catch(err => {
                next(err)
            })
    }
}

module.exports = UserController