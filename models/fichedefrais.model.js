const connection = require('../config/db')

const search = (id,mois, callback) => {
    
    connection.query('SELECT * FROM fichefrais WHERE idutilisateur =(?) AND mois=(?)', [id, mois], callback)
    
}
const searchAll = (id, callback) => {
    
    
    connection.query('SELECT * FROM fichefrais WHERE idutilisateur = (?)', id, callback)
    
}
const searchFraisForfait = (callback) => {
    
    connection.query('SELECT * FROM fraisforfait', callback)
    
}

const searchLigneFraisForfait = (id,mois,callback) => {
    connection.query('SELECT quantite FROM lignefraisforfait WHERE idutilisateur = (?) AND mois=(?)',[id, mois], callback)
}
const searchLigneFraisHorsForfait = (id,mois,callback) => {
    connection.query('SELECT id, libelle, date, montant FROM lignefraishorsforfait WHERE idutilisateur = (?) AND mois=(?)', [id,mois], callback)
}

// Fonction Fiche Frais 

const addFiche = (fiches, callback) => {
    
    var query =  'INSERT INTO fichefrais (idutilisateur, mois, nbJustificatifs, montantValide, dateModif, idEtat) VALUES (?)'
    var values = [fiches.idutilisateur, fiches.mois, fiches.nbJustificatifs, fiches.montantValide, fiches.dateModif, fiches.idEtat]
    connection.query(query, [values], callback)
    
}

const updateFiche = (id,mois,fiches, callback) => {
    var values = [fiches.nbJustificatifs, fiches.montantValide, fiches.dateModif, fiches.idEtat, id , mois]
    
    connection.query("UPDATE fichefrais SET nbJustificatifs = (?), montantValide = (?), dateModif = (?), idEtat = (?) WHERE idutilisateur = (?) AND mois = (?)",values, callback )
    
    
}

// Fonction Ligne Frais Forfait
const addLigneFraisForfait = (ligneFraisForfait, callback) => {
    var values = [ligneFraisForfait.idutilisateur,ligneFraisForfait.mois,ligneFraisForfait.idFraisForfait,ligneFraisForfait.quantite]
    
    connection.query("INSERT INTO lignefraisforfait (idutilisateur, mois, idFraisForfait, quantite) VALUES (?)", [values], callback)
    

}

const updateLigneFraisForfait = (id, mois, idFraisForfait,ligneFraisForfait, callback) => {
    var values = [ligneFraisForfait.quantite, id, mois, idFraisForfait]
    console.log(values)
    
    connection.query("UPDATE lignefraisforfait SET quantite = (?) WHERE idutilisateur= (?) AND mois = (?) AND idFraisForfait = (?)", values, callback)
    

}

const deleteLigneFraisForfait = (id, mois, idFraisForfait, callback) => {
    var values = [id, mois, idFraisForfait]
    
    connection.query('DELETE FROM lignefraisforfait WHERE idutilisateur=(?) AND mois=(?) AND idFraisForfait = (?)', values , callback)
    

}

//fonction ligne hors forfait

// Ajoutez une colonne Justificatif ?
const addLigneFraisHorsForfait = (ligneFraisHorsForfait, callback) => {
    var values = [ligneFraisHorsForfait.idutilisateur,ligneFraisHorsForfait.mois,ligneFraisHorsForfait.libelle,ligneFraisHorsForfait.date, ligneFraisHorsForfait.montant]
    
    connection.query("INSERT INTO lignefraishorsforfait (idutilisateur, mois, libelle, date, montant) VALUES (?)", [values], callback)
    

}
const updateLigneFraisHorsForfait = ( ligneFraisHorsForfait, id, callback) => {
    var values = [ligneFraisHorsForfait.libelle,ligneFraisHorsForfait.date,ligneFraisHorsForfait.montant, id]
    
    connection.query("UPDATE lignefraishorsforfait SET libelle =(?), date=(?), montant=(?) WHERE id = (?)", values, callback)
    

}

const deleteLigneFraisHorsForfait = (id, callback) => {
    
    connection.query('DELETE FROM lignefraishorsforfait WHERE  id = (?)', id , callback)
    

}

module.exports = {
    search,
    searchAll,
    searchFraisForfait,
    searchLigneFraisForfait,
    searchLigneFraisHorsForfait,
    addFiche,
    addLigneFraisForfait,
    addLigneFraisHorsForfait,
    updateLigneFraisForfait,
    updateLigneFraisHorsForfait,
    updateFiche,
    deleteLigneFraisForfait,
    deleteLigneFraisHorsForfait
    
}
