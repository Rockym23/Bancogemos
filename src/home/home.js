import React, { useState, useEffect , useContext} from 'react'
import { Link } from 'react-router-dom'
import image from "../banco.jpg";
import { useAuth } from '../context/AuthContext';

function Home() {


const [lista, setLista] = useState([]);
const authContext = useAuth();
const [loggedUser, setLoggedUser] = React.useState(authContext);

const {cuser, logout, loading, isLoggedIn} = authContext;
  

useEffect(()=>{
  fetch('/account/all')
  .then(response=> { 
    if(response.ok)
    {
        return response.json();
    }
    throw response;
  })
  .then(data => setLista(data))
  .catch(error => setLista([{name:"No se pudo obtener lista"}]))
  .finally(() =>{
    console.log("Result");
    console.log(lista); 
  });
}, []);


  return (
    
    <div className="card " style={{width: '30rem'}}>
        
    <div className="card-header text-white bg-primary border-primary mb-3"> <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-house-fill" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293l6-6zm5-.793V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z"/>
  <path fill-rule="evenodd" d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z"/>
</svg> <label className='titleCard'>BANCO GEMOS </label></div>
    <div className="card-body ">
      <img src={image} />
    <p className="card-text">El mejor banco de México y el Mundo, donde puedes hacer depositos, retiros y consultar información relevante de las finanzas.</p>
    <p className="card-text">Nuestra misión es ayudar a la gente a que aprenda a administrar su dinero y la visión es ser el mejor banco reconocido a nivel mundial.</p>
    <p className="card-text">A continuación breve explicación de cada sección</p>

    <h4 className="card-text"> NavBar </h4>
    <p className="card-text"> La parte superior te permite navegar por las diferentes secciones, que son:  </p>
      <ul>
        <li>Crear Cuenta</li>
        <li>Depositar</li>
        <li>Retirar</li>
        <li>All Data</li>
      </ul>
    
    
    <h4 className="card-text"> Crear Cuenta </h4>
    <p className="card-text"> Creas un registro con su nombre, email y saldo, El nombre no debe estar vacio, el email debe ser de la forma mail@domain.com y 
    el saldo no puede ser negativos, el boton de Limpiar permite borrar campos para empezar de nuevo, habra mensajes que aparecen tanto de fallo como éxito </p>
    

    <h4 className="card-text"> Depositar </h4>
    <p className="card-text"> En esta sección podrás insertar dinero a la cuenta determinada, la busqueda es primero por el email y los campos se llenarán con el nombre
    y el saldo actual, no puedes depositar valores negativos. el boton de Limpiar permite borrar campos para empezar de nuevo, habra mensajes que aparecen tanto de fallo como éxito</p>
    
    <h4 className="card-text"> Retirar </h4>
    <p className="card-text"> En esta sección podrás retirar dinero a la cuenta determinada, la busqueda es primero por el email y los campos se llenarán con el nombre
    y el saldo actual, no puedes retirar valores negativos y tampoco retirar mas de lo que tiene la cuenta en el saldo
     el boton de Limpiar permite borrar campos para empezar de nuevo, habra mensajes que aparecen tanto de fallo como éxito</p>
    
    <h4 className="card-text"> All Data</h4>
    <p className="card-text"> Esta sección es meramente informativo y te enlista todas las cuentas que se encuentran registradas con su email y su saldo, y la cantidad en total que existen
    en el servidor de Strapi  </p>
    
    <h4 className="card-text">IMPORTANTE</h4>
    <p className="card-text"> Para utilizar las funciones "Crear Cuenta", "Depositar", "Retirar" y "All Data", es necesario que te registres,
    puedes crear una cuenta con un correo determinado, o puedes utilizar tu correo de Google.</p>
  </div>
</div>
  )
}

export default Home


//<img src="..." class="card-img-top" alt="...">