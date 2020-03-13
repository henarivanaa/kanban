const { User, Task } = require('../models')
const { generateToken } = require('../helpers/jwt')
const { comparer } = require('../helpers/bcrypt')
const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client(process.env.CLIENT_ID)

class UserController {
    static register = async (req, res, next) => {
        try {
            let { name, email, password } = req.body
            let newUser = {
                name,
                email,
                password
            }
            let user = await User.create(newUser)
            let token = generateToken({ id: user.id, email: user.email }, 'rahasia')
            res.status(201).json(token)
        } catch (error) {
            next(error)
        }
    }

    static login = async (req, res, next) => {
        try {
            let { email, password } = req.body
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

    static glogin = async (req, res, next) => {
        try {
            let { token } = req.body
            let ticket = await client.verifyIdToken({ idToken : token, audience: process.env.CLIENT_ID })
            let payload = ticket.getPayload()
            let existedUser = await User.findOne({ where: { email: payload.email } })
            console.log(payload)
            let user
            if (!existedUser) {
                let newUser = {
                    name: payload.given_name + ' ' + payload.family_name,
                    email: payload.email,
                    password: 'inirandombangetsumpah'
                }
                user = await User.create(newUser)
            } else {
                user = existedUser
            }
            let id = user.id
            let email = user.email
            let googleToken = generateToken({ id, email }, process.env.JWT_SECRET)
            res.status(200).json(googleToken)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = UserController