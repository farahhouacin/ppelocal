
const { response } = require("express")
const connection = require("../config/db")
const ficheModel = require('../models/fichedefrais.model')

const search = (request,response) => {
    ficheModel.search(request.params.id, request.params.mois, (err, result) => {
        response.json({result})
    })
}

const searchAll = (request,response) => {
    ficheModel.searchAll(request.params.id, (err, result) => {
        response.json({result})
    })
}
const searchFraisForfait = (request,response) => {
    ficheModel.searchFraisForfait((err, result) => {
        response.json({result})
    })
}

const searchLigneFraisForfait = (request, response) => {
    ficheModel.searchLigneFraisForfait(request.params.id, request.params.mois,(err,result) => {
        response.json({result})
    })
}
const searchLigneFraisHorsForfait = (request, response) => {
    ficheModel.searchLigneFraisHorsForfait(request.params.id, request.params.mois,(err,result) => {
        response.json({result})
    })
}

const updateFiche = (request,response) => {
    const body = request.body
    ficheModel.updateFiche(request.params.id, request.params.mois, body, (err, result) => {
        response.json({result})
    })
}
const updateLigneFraisForfait = (request,response) => {
    const body = request.body
    ficheModel.updateLigneFraisForfait(request.params.id, request.params.mois, request.params.idFraisForfait, body, (err, result) => {
        if (err) response.json(err)
        else response.json({result})
    })
}
const updateLigneFraisHorsForfait = (request,response) => {
    const body = request.body
    ficheModel.updateLigneFraisHorsForfait(body, request.params.id,(err, result) => {
        if (err) response.json(err)
        else response.json({result})
    })
}
const deleteLigneFraisForfait = (request,response) => {
    ficheModel.deleteLigneFraisForfait(request.params.id, request.params.mois, request.params.idFraisForfait, (err, result) => {
        if (err) response.json(err)
        else response.json({result})
    })
}
const deleteLigneFraisHorsForfait = (request,response) => {
    ficheModel.deleteLigneFraisHorsForfait(request.params.id, (err, result) => {
        if (err) response.json(err)
        else response.json({result})
    })
}
//Fonction ligne Hors forfait
const addLigneFraisHorsForfait = (request,response) => {
    const body = request.body
    ficheModel.addLigneFraisHorsForfait(body, (err, result) => {
        if (err) response.json(err)
        else response.json({result})
    })
}
const addLigneFraisForfait = (request,response) => {
    const body = request.body
    ficheModel.addLigneFraisForfait(body, (err, result) => {
        if (err) response.json(err)
        else response.json({result})
    })
}
const addFiche = (request,response) => {
    const body = request.body
    ficheModel.addFiche(body, (err, result) => {
        if (err) response.json(err)
        else response.json({result})
    })
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