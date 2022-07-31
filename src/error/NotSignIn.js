import React from 'react'
import { Link} from 'react-router-dom';


function NotSignIn() {
  return (
    <div className="card text-bg-danger" style={{width: '30rem'}}>
           
        <div className="card-header text-white bg-danger border-primary mb-3"> <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-x-octagon" viewBox="0 0 16 16">
  <path d="M4.54.146A.5.5 0 0 1 4.893 0h6.214a.5.5 0 0 1 .353.146l4.394 4.394a.5.5 0 0 1 .146.353v6.214a.5.5 0 0 1-.146.353l-4.394 4.394a.5.5 0 0 1-.353.146H4.893a.5.5 0 0 1-.353-.146L.146 11.46A.5.5 0 0 1 0 11.107V4.893a.5.5 0 0 1 .146-.353L4.54.146zM5.1 1 1 5.1v5.8L5.1 15h5.8l4.1-4.1V5.1L10.9 1H5.1z"/>
  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
</svg> <label className='titleCard'> Acceso Denegado </label></div>
        <div className="card-body ">
        <p className="card-text">No tienes autorizado acceder a esta sección.</p>
        <p className="card-text">
        Para poder hacer esta operación necesitas crear una cuenta en esta liga <Link to="/signup">Sign up </Link></p>
        <p> Si ya tienes una cuenta debes loggeart en esta liga <Link to="/signin">Sign in </Link>
        </p>
        
        </div>
        </div>
  )
}

export default NotSignIn