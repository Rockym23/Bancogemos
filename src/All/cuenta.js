import React from 'react'

function Cuenta(props) {

  const arrClases = ["card text-white bg-primary mb-3", "card text-white bg-secondary mb-3" , "card text-white bg-info mb-3" , "card text-white bg-danger mb-3" ]  

  return (
    <div className={arrClases[props.index]} style={{ width: "30rem" }}>
  <div className="card-header">ID: {props.id} - Name: {props.name}</div>
  <div className="card-body">
    <h5 className="card-title">Email: {props.email}</h5>
    <p className="card-text">Saldo: ${props.saldo}</p>
  </div>
    </div>
  )
}

export default Cuenta