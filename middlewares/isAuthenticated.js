const User = require('../models/User')

const isAuthenticated = async (req, res, next) => {
    try {

        const { authorization } = req.headers

        if (!authorization) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        const user = await User.findOne({token: authorization.replace('Bearer ', '')})
        
        if (!user) {
            return res.status(401).json({ error: "Unauthorized" });
        } 

        req.user = user
        return next()
    } catch (error) {
        console.log('error', error)
        return res.status(400).json({message: error.message})
    }
}

module.exports = isAuthenticated