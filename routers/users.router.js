const { response } = require("express")
const express = require('express')
const userController = require('../controllers/users.controller')
let router = express()


//Recupération données
router.post('/auth', userController.searchAll)

router.get('/:id', (request, response) => {
    const id = request.params.id
    const result = userController.search(id)
    response.json(result)
})

//Créer une donnée
router.post('/new', userController.addUser)
// Modifier BDD
router.put('/:id', userController.updateUser)


//Supprimer données
router.delete('/delete/:id',userController.deleteUser)

module.exports = router