import '../App.css'
import Header from '../components/header/Header'
import Footer from '../components/footer/Footer'
import LoginForm from '../components/login/Login'
import React from 'react'

class Login extends React.Component {
    constructor(props) {
        super (props)

    }
    render() {
        return (
            <div class="container-fluid">
            <Footer/>
            <LoginForm/>

            </div>
        )
        }
}
export default Login;
