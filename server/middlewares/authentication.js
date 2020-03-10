const { verifyToken } = require('../helpers/jwt')

const authentication = (req, res, next) => {
    try {
        let { token } = req.headers
        req.userData = verifyToken(token, process.env.JWT_SECRET)
        next()
    } catch (error) {
        next(
            {
                status: 403,
                message: "You need to login first!"
            }
        )
    }
}