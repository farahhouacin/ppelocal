const { response } = require("express")
const express = require("express")
const ficheController = require('../controllers/fichedefrais.controller') // LES 2 .. PERMETTENT DE SORTIR DU DOSSIER
let router = express()

router.get('/lignefraisforfait/:id/:mois', ficheController.searchLigneFraisForfait)
router.get('/lignefraishorsforfait/:id/:mois', ficheController.searchLigneFraisHorsForfait)
router.get('/:id', ficheController.searchAll)
router.get('/fraisforfait', ficheController.searchFraisForfait) 
router.get('/:id/:mois', ficheController.search)

//Créer une donnée
router.post('/new', ficheController.addFiche)

router.post ('/lignefraisforfait/new', ficheController.addLigneFraisForfait)
router.post ('/lignefraishorsforfait/new', ficheController.addLigneFraisHorsForfait)

// Modifier BDD
//router.put('/:id/:mois', ficheController.updateFiche)

router.put('/lignefraisforfait/:id/:mois/:idFraisForfait', ficheController.updateLigneFraisForfait)
router.put('/lignefraishorsforfait/:id', ficheController.updateLigneFraisHorsForfait)
//Supprimer données
router.delete('/lignefraisforfait/delete/:id/:mois/:idFraisForfait', ficheController.updateFiche)
router.delete('/lignefraishorsforfait/delete/:id/', ficheController.deleteLigneFraisHorsForfait)



module.exports = router

