import React from 'react'
import './CreateBill.css'
import * as fromBillsApi from '../../api/bills'
import {withRouter } from "react-router-dom"



class CreateBill extends React.Component {


  constructor(props) {
    super(props)

    this.state = {
      fraishorsforfait: [],
      nightsQty:0,
      repasQty:0,
      kmQty:0,
      date:'',
      anneeMois:''            
  }

}
handleChange(e){
	e.preventDefault()
	let name = e.target.name
	this.setState({
		[name]: e.target.value
	})
}
handleRowsChange(e, i){
  e.preventDefault()
  let {name, value } = e.target
  let fraishorsforfait = [...this.state.fraishorsforfait]
  fraishorsforfait[i] = {
      ...fraishorsforfait[i],
      [name] : value
  }
  this.setState({
      fraishorsforfait : fraishorsforfait    
  }, () => console.log(this.state.fraishorsforfait))
}

addRows() {
  this.setState({
      fraishorsforfait: [...this.state.fraishorsforfait, {date: '', libelle: '', montant: '', justificatif: '' }]
  })
}

removeRows(i){
  let row = this.state.fraishorsforfait
  row.splice(i,1)
  this.setState({
      fraishorsforfait:row
  })
}

async postFiche(){
  let idUser = localStorage.getItem('id')
  let fiche = await fromBillsApi.postAddFiche({idutilisateur : idUser, mois: this.state.anneeMois, nbJustificatifs : '5', montantValide : '70.00', dateModif : '2021-04-04', idEtat : 'CR'})
  let km = await fromBillsApi.postLigneFraisForfait({idutilisateur : idUser, mois: this.state.anneeMois, idFraisForfait : 'KM', quantite : this.state.kmQty})
  let night = await fromBillsApi.postLigneFraisForfait({idutilisateur : idUser, mois: this.state.anneeMois, idFraisForfait : 'NUI', quantite : this.state.nightsQty})
  let meals = await fromBillsApi.postLigneFraisForfait({idutilisateur : idUser, mois: this.state.anneeMois, idFraisForfait : 'REP', quantite : this.state.repasQty})
  this.state.fraishorsforfait.map(async (f,i) => {
      let horsforfait = await fromBillsApi.postLigneFraisHorsForfait({idutilisateur : idUser, mois: this.state.anneeMois, libelle : f.libelle, date : f.date, montant : f.montant})

  })
  this.props.history.push('/bills')
  
}



async componentDidMount() {
  let months = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre']
  let numMonth = new Date().getMonth()
  let year = new Date().getFullYear()
  let monthText
  months.map((month, i) => {
      if(i == numMonth) monthText = month
  })


  let tabMois = ['01','02', '03', '04', '05', '06','07','08','09','10','11','12',]
  let numMois = new Date().getMonth()
  let mois 
  tabMois.map((num, i) => {
      if (i == numMois) mois = num
  })
      
  this.setState({
      date : ` de ${monthText} ${year}`,
      anneeMois : year + mois
  })

}


  render() {
    return (
      <main className="flex-shrink-0">
      <div className="container " >
      <h2>
              Fiche de remboursement du mois {this.state.date}
          </h2>
       
              <hr className="ligne"/>                    
              <h5 className="centrer">Frais Forfait </h5>
              <div className="card border-primary">
              
                  <div className="card-body">
              
                      <table className="table text-center">
                          <thead>
                              <tr>
                                  <th scope="col">Frais </th>
                                  <th scope="col">Quantité</th>
                                  <th scope="col">Montant unitaire</th>
                                  <th scope="col">Total</th>
                              </tr>
                          </thead>
                          <tbody>
                              <tr>
                                  <td><label className="form-control-label"><strong>Nuitées</strong></label></td>
                                  <td><input type="text" name="nightsQty" placeholder="Qté" value={this.state.nightsQty} onChange={(e) => this.handleChange(e)} /></td>
                                  <td>80€</td>
                                  <td>{this.state.nightsQty * 80}€</td>
                              </tr>
                              <tr>
                                  <td><label for="" className="form-control-label"><strong>Repas</strong></label></td>
                                  <td><input type="text" name="repasQty" placeholder="Qté" value={this.state.repasQty} onChange={(e) => this.handleChange(e)} /></td>
                                  <td>29€</td>
                                  <td>{this.state.repasQty * 29}</td>
                              </tr>
                              <tr>
                                  <td><label for="" className="form-control-label"><strong>Kilométrage</strong></label></td>
                                  <td><input type="text" name="kmQty" placeholder="Qté" value={this.state.kmQty} onChange={(e) => this.handleChange(e)}/></td>
                                  <td>0.6€</td>
                                  <td>{this.state.kmQty * 0.6}</td>
                              </tr>
                          </tbody>
                      </table>
                  </div>
              </div>

              <br />
              <h5 className="centrer">Frais Hors Forfait </h5>
              <div className="card border-primary">
                  <div className="card-body">
                  <button type="button" className="btn btn-success btn-sm" onClick={() => this.addRows()}>Ajoutez un frais hors forfait</button>
                      <table className="table text-center">
                          <thead>                                
                          
                              <tr>
                                  <th scope="col">Dates</th>
                                  <th scope="col">Libellé</th>
                                  <th scope="col">Montant</th>
                                  <th scope="col"> Justificatifs</th>
                                  <th scope="col"> Actions</th>
                              </tr>
                          </thead>
                          
                          <tbody>
                              {
                                   this.state.fraishorsforfait.map((f, i) => {
                                      return (
                                          <tr key={i}>
                                              <td><input type="date" name="date" value={this.state.fraishorsforfait[i].date} onChange={(e) => this.handleRowsChange(e,i)}/></td>
                                              <td><input type="text" placeholder="Libellé" name="libelle" value={this.state.fraishorsforfait[i].libelle} onChange={(e) => this.handleRowsChange(e,i)}/></td>
                                              <td><input type="text   " placeholder="Montant" name="montant" value={this.state.fraishorsforfait[i].montant} onChange={(e) => this.handleRowsChange(e,i)}/></td>
                                              <td><input type="file" name="justificatif" value={this.state.fraishorsforfait[i].justificatif} onChange={(e) => this.handleRowsChange(e,i)}/></td>
                                              <td>
                                                  <button type="button" className="btn btn-danger btn-sm mr-2" data-action="delete" onClick={() => this.removeRows(i)}>
                                                      X
                                                  </button>
                                              </td>
                                          </tr>
                                      )
                                  })
                              }   

                          </tbody>
                      </table>
                      
                  </div>
              </div>
                      <div class="col text-center">
                          <button type="submit" class="btn btn-primary mt-3 mb-3" onClick={() => this.postFiche()}>Créer la fiche </button>
                      </div>
          
          </div>

</main>

     

    )
  }
}

export default withRouter(CreateBill);
