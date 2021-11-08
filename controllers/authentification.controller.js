const userModel = require('../models/users.model')
const createAccessToken = require('../config/token')
const searchByLogin =  (request, response) => {


// méthode 
    const { login, mdp } = request.body
    userModel.searchByLogin(login, async(err, result) => {
        try {
            if (err) throw err
            else {
                if (mdp == result[0].mdp) {

                    const token = await createAccessToken(result[0])
                    response.json({ token })
                } else {
                    response.status(403).send({ error: 'Forbidden' })
                }
            }
        } catch (e) {
            response.status(403).send({ error: 'Forbidden' })
            console.error(e)
        }
    })
}


module.exports = {
    searchByLogin
}


