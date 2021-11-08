const { response } = require("express")
const express = require("express")
const authenticationController = require('../controllers/authentification.controller')
let router = express()


router.post('/', authenticationController.searchByLogin)

module.exports = router