import React from 'react'
import '../App.css';
import Header from '../components/header/Header'
import Footer from '../components/footer/Footer'
import BillsList from '../components/billsList/BillsList'

class Bills extends React.Component {

  constructor(props){
    super(props)
  }

  render () {
    return (
      <body class="d-flex flex-column h-100">
      <Header />
      <BillsList />
      <Footer />

      </body>
    )
  }
}

export default Bills;
