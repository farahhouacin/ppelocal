var jsonwebtoken = require('jsonwebtoken') 

//tokens d'authentification permet à l'utilisateur de ne se connecter qu'une fois
//et de rester connecter toute la durée de validité du token

const createAccessToken = (user) => { // creation d'un token
    return new Promise((resolve, reject) => {
        if(user.id === undefined) reject({error:'Invalid Credentials'})
    else{
            const signedUser = {
                email: user.login,
                id: user.id
            }

            jsonwebtoken.sign(signedUser,"ppe", {expiresIn: '1d'}, (error, token) => {
                if(error) reject(error)
                resolve(token)
            })
        }
    })
}

module.exports = createAccessToken