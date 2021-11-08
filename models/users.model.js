  
const connection = require('../config/db')

const searchByLogin = (login, callback) => {
    connection.query('SELECT * from utilisateur WHERE login = (?)', login, callback)

}
const searchAll = (login,callback) => {
    
    
    connection.query('SELECT * FROM utilisateur WHERE login=(?)',login, callback)
    
}

const addUser = (user, callback) => {
    connection.connect()
    var query =  'INSERT INTO utilisateur (id, nom, prenom, login, mdp, adresse, cp, ville, dateEmbauche, role ) VALUES (?)'
    var values = [user.id,user.nom, user.prenom, user.login, user.mdp, user.adresse, user.cp, user.ville, user.dateEmbauche, user.role]
    connection.query(query, [values], callback)
    connection.end()
}

const updateUser = (id,user, callback) => {
    var values = [user.nom, user.prenom, user.login, user.mdp, user.adresse, user.cp, user.ville, user.dateEmbauche, user.role, id]
    connection.connect()
    connection.query("UPDATE utilisateur SET nom=(?), prenom=(?), login=(?), mdp=(?), adresse=(?), cp=(?), ville=(?), dateEmbauche=(?), role=(?) WHERE id= (?)",values, callback )
    connection.end()

}

const deleteUser = (id,callback) => {
    connection.connect()
    connection.query('DELETE FROM utilisateur WHERE id=(?)', id , callback)
    connection.end()

}

module.exports = {
    searchAll,
    addUser,
    updateUser,
    deleteUser,
    searchByLogin
}