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

    static login = async (req, res, next) => {
        let { email, password } = req.body
        try {
            let user = await User.findOne({ where: { email } })
            let valid = await comparer(password, user.password)
            if (user) {
                if (valid) {
                    let token = generateToken({ id: user.id, email: user.email }, 'rahasia')
                    res.status(200).json(token)
                } else {
                    next(
                        {
                            status: 400,
                            message: "Wrong Email/Password"
                        }
                    )
                }
            } else {
                next({
                    status: 400,
                    message: "Wrong Email/Password"
                })
            }
        } catch (error) {
            next(error)
        }
    }
}

module.exports = UserController