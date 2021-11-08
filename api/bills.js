export const getBills = async (id) => {
    let response = await fetch('http://localhost:3001/fiches/'+ id, {
        method: 'GET',
        headers: {
            'Accept' : 'application / json',
            'Content-Type' : 'application/json'
    }
    })
    let bills = await response.json()
    return bills
}

export const getLigneFraisForfait = async (id, mois) => {
    let response = await fetch('http://localhost:3001/fiches/lignefraisforfait/'+ id + '/' + mois , {
        method: 'GET',
        headers: {
            'Accept' : 'application / json',
            'Content-Type' : 'application/json'
    }
    })
    let ligneFraisForfait = await response.json()
    return ligneFraisForfait
}
export const getLigneFraisHorsForfait = async (id, mois) => {
    let response = await fetch('http://localhost:3001/fiches/lignefraishorsforfait/'+ id + '/' + mois , {
        method: 'GET',
        headers: {
            'Accept' : 'application / json',
            'Content-Type' : 'application/json'
    }
    })
    let ligneFraisHorsForfait = await response.json()
    return ligneFraisHorsForfait
}

export const postAddFiche = async (ficheFrais) => {
    let response = await fetch('http://localhost:3001/fiches/new', {
        method: 'POST',
        headers: {
            'Accept' : 'application / json',
            'Content-Type' : 'application/json'
    }, 
    body: JSON.stringify(ficheFrais)
    })
    let fichesFrais = await response.json()
    return fichesFrais
}

export const postLigneFraisForfait = async (ligneFraisForfait) => {
    let response = await fetch('http://localhost:3001/fraisforfait/lignefraisforfait/new', {
        method: 'POST',
        headers: {
            'Accept' : 'application / json',
            'Content-Type' : 'application/json'
    }, 
    body: JSON.stringify(ligneFraisForfait)
    })
    let ligneFraisForfaits = await response.json()
    return ligneFraisForfaits
}

export const postLigneFraisHorsForfait = async (ligneFraisHorsForfait) => {
    let response = await fetch('http://localhost:3001/fraisforfait/lignefraishorsforfait/new', {
        method: 'POST',
        headers: {
            'Accept' : 'application/json',
            'Content-Type' : 'application/json'
    },
    body: JSON.stringify(ligneFraisHorsForfait)
    })
    let ligneFraisHorsForfaits =await response.json()
    return ligneFraisHorsForfaits
}

export const putLigneFraisForfait = async (id, mois, idFraisForfait,quantite) => {
    
    let response = await fetch('http://localhost:3001/fiches/lignefraisforfait/' + id + '/' + mois +'/' + idFraisForfait , {
        method: 'PUT',
        headers: {
            'Accept' : 'application/json',
            'Content-Type' : 'application/json'
    }, 
    body: JSON.stringify({quantite})
    })
    let ligneFraisForfaits = await response.json()
    return ligneFraisForfaits
}

export const putLigneFraisHorsForfait = async (id, ligneFraisHorsForfait) => {
    let response = await fetch('http://localhost:3001/fiches/lignefraishorsforfait/' + id , {
        method: 'PUT',
        headers: {
            'Accept' : 'application/json',
            'Content-Type' : 'application/json'
    },
    body: JSON.stringify(ligneFraisHorsForfait)
    })
    let ligneFraisHorsForfaits = await response.json()
    return ligneFraisHorsForfaits
}