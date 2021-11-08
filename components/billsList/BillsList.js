import React from 'react'
import './BillsList.css';
import * as fromBillsApi from '../../api/bills'
import Modal from 'react-bootstrap4-modal'
import moment from 'moment'
class BillsList extends React.Component {


  constructor(props) {
    super(props)

    this.state = ({
        idFraisForfait: ['KM' , 'NUI', 'REP'],
        visible: false,
        quantite:'',
        mois:'',
        bills: [],
        users:[],
        fraishorsforfait: [],
        kmQty:0,
        nightsQty:0,
        repasQty:0,
        profileImg:''
    })

}

showModal() {
  this.setState({
    visible: !this.state.visible
  })
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

ShowModal() {
  
  this.setState({
      visible: !this.state.visible
  })
}

async getLignes(mois) {
 
  let id = localStorage.getItem('id')
  let ligneff = await fromBillsApi.getLigneFraisForfait(id, mois)
  let lignefhf = await fromBillsApi.getLigneFraisHorsForfait(id,mois)
  lignefhf.result.map((ligne,i) => {

      ligne.date = moment(ligne.date).format("YYYY-MM-DD")
  })
  
  this.setState({
      kmQty: ligneff.result[0].quantite,
      nightsQty: ligneff.result[1].quantite,
      repasQty: ligneff.result[2].quantite,
      fraishorsforfait: lignefhf.result,
      mois: mois

  })

}


async update() {
  let idUser = localStorage.getItem('id')
  
  await fromBillsApi.putLigneFraisForfait(idUser, this.state.mois, this.state.idFraisForfait[0],this.state.kmQty)
  await fromBillsApi.putLigneFraisForfait(idUser, this.state.mois, this.state.idFraisForfait[1],this.state.nightsQty)
  await fromBillsApi.putLigneFraisForfait(idUser, this.state.mois, this.state.idFraisForfait[2],this.state.repasQty)
  
  this.state.fraishorsforfait.map(async (f,i) => {
      let horsforfait = await fromBillsApi.putLigneFraisHorsForfait(f.id, {idutilisateur : idUser, mois: this.state.mois, libelle : f.libelle, date : f.date, montant : f.montant})
  })

  
  this.setState({
      visible : !this.state.visible
  })
}
addRows() {
        
  this.setState({
      fraishorsforfait: [...this.state.fraishorsforfait, {date: '' , libelle: '', montant: '', justificatif: ''}]
  })
}
removeRows(i){
  let row = this.state.fraishorsforfait
  row.splice(i,1)
  this.setState({
      fraishorsforfait:row
  })
}

async componentDidMount() {
  let id = localStorage.getItem('id')
  let bills = await fromBillsApi.getBills(id)
  this.setState({ 
      bills: bills.result,
      
  })

  
}

render() {
    return (

      <main className="flex-shrink-0">
      <div className="container">
        <h1 className="mt-5">Bienvenue sur votre espace personnel</h1>
        <table className="table table-hover">
      <thead>
        <tr>
          <th>Mois</th>
          <th>Justificatifs</th>
          <th>Montant</th>
          <th>Date de modification</th>
          <th>Etat</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {this.state.bills.map((bill,i) => {
          return(
            <tr>
              <th scope="row"> {bill.mois} </th>
              <td> {bill.nbJustificatifs}</td>
              <td> {bill.montantValide}</td>
              <td> {bill.dateModif}</td>
              <td> {bill.idEtat}</td>
              <td>
                <button type="button" class="btn btn-info" data-action="update" onClick={() => {this.showModal(); this.getLignes(bill.mois)}}>Modifier</button>
              </td>

            </tr>
          )})
        } 

      </tbody>
    </table>
    <Modal dialogClassName="center modal-80w modal-dialog-scrollable" visible={this.state.visible} onClickBackdrop={() => this.showModal()} >
      <div className="modal-header">
        <h5 className="modal-title">Modification de la fiche  {this.state.mois} </h5>
        <button type="button" className="btn btn-danger" onClick={() => this.ShowModal()}>
                              Annuler
                          </button>
      </div>
      <div className="modal-body">
        <h3> Frais forfaitaires</h3>
        <div class="card border-primary py-3 px-3 mb-3">
          <div class="card-body">
            <table class="table text-center">
              <thead>
                <tr>
                  <th scope="col">Frais forfaitaires</th>
                  <th scope="col">Quantité</th>
                  <th scope="col">Montant unitaire</th>
                  <th scope="col">Total</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><label class="form-control-label"><strong>Nuitées</strong></label></td>
                  <td><input className="form-control form-control-sm" type="number" min="0" step="1" name="nightsQty" placeholder="Qte" value={this.state.nightsQty} onChange={(e) => this.handleChange(e)} /> </td>
                  <td>80€</td>
                  <td> {this.state.nightsQty * 80} </td>
                  <td>
                    <button type="button" className="btn btn-danger btn-sm mr-2" data-action="delete" data-target="">
                      <i class="fas fa-trash"></i>
                    </button>
                    <button type="button" className="btn btn-success btn-sm" data-action="delete" data-target="">
                      <i class="fas fa-edit"></i>
                    </button>
                  </td>
                </tr>
                <tr>
                  <td><label class="form-control-label"><strong>Repas</strong></label></td>
                  <td><input className="form-control form-control-sm" type="number" min="0" step="1" name="mealsQty" placeholder="Qte" value={this.state.mealsQty} onChange={(e) => this.handleChange(e)}/></td>
                  <td>29€</td>
                  <td> {this.state.mealsQty * 29}  </td>
                </tr>
                <tr>
                  <td><label for="" class="form-control-label"><strong>Kilométrage</strong></label></td>
                  <td><input className="form-control form-control-sm" type="number" min="0" step="1" name="kmsQty" placeholder="Qte" value={this.state.kmsQty} onChange={(e) => this.handleChange(e)}/></td>
                  <td>0,80 €</td>
                  <td>{(this.state.kmsQty * 0.8).toFixed(2)} </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>    
                      
                    
        <div className="fraishorsforfait">
          <h3>Frais hors-forfaits</h3>
          <button className="btn btn-success btn-sm" onClick={() => this.addRow()}>Ajouter frais hors forfait</button>
        </div>

        <div class="card border-primary py-3 px-3">
          <div class="card-body">													
                          
            <table class="table text-center">
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
                {this.state.fraishorsforfait.map((r,i) => {
                  return (
                    <tr key={i}>
                      <th ><input type="date" name="date" value={this.state.fraishorsforfait[i].date} onChange={(e) => this.handleRowsChange(e,i)} /> </th>
                        <td><input className="form-control form-control-sm" type="text" placeholder="Qte" value={this.state.fraishorsforfait[i].libelle} onChange={(e) => this.handleRowsChange(e,i)}/> </td>
                        <td><input type="text" placeholder="Libelle" value={this.state.fraishorsforfait[i].libelle} onChange={(e) => this.handleRowsChange(e,i)} /></td>
                        <td> <input type="file" name="justificatif" value={this.state.fraishorsforfait[i].justificatif} onChange={(e) => this.handleRowsChange(e,i)}/> </td>
                        <td><button className="btn btn-danger btn-sm" data-action="delete" onClick={() => this.removeRow(i)}> x </button> </td>

                    </tr>
                  )})
                }																						
      
              </tbody>
            </table>
          </div>
        </div>
                      
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" onClick={() => this.update()}>
          Enregistrer
        </button>
        <button type="button" className="btn btn-primary" onClick={() => this.ShowModal()}>
          Annuler
        </button>
      </div>
    </Modal>
      </div>
  
    </main>
    )
  }
}

export default BillsList;
