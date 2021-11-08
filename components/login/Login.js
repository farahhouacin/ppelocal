import './Login.css'
import React from 'react'
import {withRouter} from 'react-router-dom'
import {getToken} from '../../api/auth'
import Modal from "react-bootstrap4-modal"
class Login extends React.Component {
    constructor(props) {
        super (props)
        this.state = {
            mdp : '',
            login :''
        }

    }
    handleChange(e){
        let {name,value} =e.target
        this.setState({
            [name]:value
        })
    }
    ShowModal() {
        this.setState({
            visible: !this.state.visible
        })
    }

    async login() {
        try {
          let {decoded, token} = await getToken({login: this.state.login, mdp: this.state.mdp})

          if(decoded) {
              console.log(decoded)
        localStorage.setItem('id',decoded.id)
        localStorage.setItem('token',token) 
        this.props.history.push('/bills')
    }
} catch (err){
    this.setState({
        visible: !this.state.visible
    })
}

}
    render() {
        return (
          <main class="form-signin">

              <div class="container">
              <div class="form-container sign-in-container">
              <div class="form-group">
                    <h1>Connexion</h1> 
                       
                        <span>Accéder à votre compte personnel</span>
                                       

                            
                          <div class="form-group">
                          
                          <input name ="login" class="form-control text-center " placeholder="Pseudo" onChange={(e) =>this.handleChange(e)} />
                         
                          <input type="password" name="mdp" class="form-control text-center" placeholder="Mot De Passe"onChange={(e) =>this.handleChange(e)}  />
                          </div>
                          

                          <div class="form-group text-center pt-4">
                          <button className="btn btn-primary bouton" type="submit" id="bouton1" onClick={() => this.login()}>Se connecter</button>
                          </div>
                          
                  </div>
                
                  </div>
                
                  <div class="overlay-container">
                    <div class="overlay">
                       
                        <div class="overlay-panel overlay-right">
                            <h1>Bienvenue sur GSB</h1>                           
                        </div>
                    </div>
                </div>
              </div>
              <div class="col-12 links text-center">
                          
                          <Modal visible={this.state.visible} dialogClassName="" role="alert" onClickBackdrop={() => this.ShowModal()}>

                            <div className="modal-body alert alert-danger">  
                                <h6 className="centrer">Votre mot de passe ou votre identifiant est incorrect.</h6>
                            </div>   

                          </Modal>
                      </div>
      </main>

        
        )
        }
    }

    


export default withRouter(Login);
