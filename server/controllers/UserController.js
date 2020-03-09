const { User, Task } = require('../models')
const { generateToken } = require('../helpers/jwt')
const { comparer } = require('../helpers/bcrypt')

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
        let userId = null
        let userEmail = null 
        User
            .findOne({ where: { email } })
            .then(user => {
                if (user) {
                    userId = user.id
                    userEmail = user.email
                    return comparer(password, user.password)
                } else {
                    next(
                        {
                            status: 400,
                            message: "Wrong Email/Password"
                        }
                    )
                }
            })
            .then(valid => {
                if (valid) {
                    let token = generateToken({ id: userId, email: userEmail }, 'rahasia')
                    res.status(200).json(token)
                } else {
                    next(
                        {
                            status: 400,
                            message: "Wrong Email/Password"
                        }
                    )
                }
            })
            .catch(err => {
                next(err)
            })
    }
}

module.exports = UserController