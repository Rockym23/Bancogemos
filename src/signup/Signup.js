import React, { useState , useEffect } from 'react'
import {useAuth} from "../context/AuthContext"

function Signup() {

  const typeOfMessages = ['error' , 'warning' , 'confirmation'];

  const [resetText, setResetText] = useState('Limpiar');
  const [user, setUser] = useState({
    name: '',
    password: ''
  });
  const [message, setMessage] = useState([]);
  const [typeMessage, setType] =  useState('');

  const{signup} = useAuth();
  

  const handleChange = ({target: {name, value}}) =>{
    setUser({...user, [name]: value});
  }

  const handleSubmit = async (e) =>{
    setMessage([]);
    e.preventDefault();
    const a = signup(user.name, user.password);
    a.then(function(result){
      console.log(result);
      let successMessage = ["Se ha registrado la cuenta correctamente"];
      setMessage(successMessage);
      setType(typeOfMessages[2])    
      
    }, function(err){
      console.log(err.message);
      let failedMessage = [];
      if(err.message === "Firebase: Error (auth/email-already-in-use)."){
         failedMessage.push('Este correo ya existe, por favor utilice otro');
      }else if(err.message === "Firebase: Error (auth/invalid-email)."){
        failedMessage.push('Correo invalido, use el formato adecuado');
      }   
      else{
        failedMessage.push(err.message);
      }
      setMessage(failedMessage);
      setType(typeOfMessages[0])

    })


      

  };

  function ResetFields(){
     setResetText('Limpiar');
     setUser({
      name: '',
      password: ''
    });
    setMessage([]);
  }


  return <div className="card " style={{width: '30rem'}}>
           
  <div className="card-header text-white bg-primary border-primary mb-3"> <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-person-bounding-box" viewBox="0 0 16 16">
<path d="M1.5 1a.5.5 0 0 0-.5.5v3a.5.5 0 0 1-1 0v-3A1.5 1.5 0 0 1 1.5 0h3a.5.5 0 0 1 0 1h-3zM11 .5a.5.5 0 0 1 .5-.5h3A1.5 1.5 0 0 1 16 1.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 1-.5-.5zM.5 11a.5.5 0 0 1 .5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 1 0 1h-3A1.5 1.5 0 0 1 0 14.5v-3a.5.5 0 0 1 .5-.5zm15 0a.5.5 0 0 1 .5.5v3a1.5 1.5 0 0 1-1.5 1.5h-3a.5.5 0 0 1 0-1h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 1 .5-.5z"/>
<path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
</svg> <label className='titleCard'> Sign Up </label></div>
  <div className="card-body ">
  <p className="card-text">Inserta los siguientes datos.</p>
  <form onSubmit={handleSubmit }> 
      <div className="form-group">
      <label >Email: <input className="form-control" type="text" name="name" placeholder="name@example.com" onChange={handleChange}></input></label> <br></br> <br></br>
      </div>
      <div className="form-group">
      <label >Password(NIP): <input type="password" className="form-control" name="password" pattern="[0-9]{7}" maxLength="7" onChange={handleChange} ></input></label> <br></br> <br></br>
      </div>
      <div className="form-group">
      <ul className={(typeMessage =='error') ? "errorMessage" : "confirmationMessage"}>{
            message.map((mensaje, index) => {
                return (<li key={index}>{mensaje}  </li>)
            })
            
            }</ul> <br></br>
      <input type="submit" value="Registrar Cuenta"  className="btn btn-primary" /> <br></br> <br></br>
      <input type="reset" value={resetText}  className="btn btn-primary" onClick={ResetFields} /> 
      </div>
  </form>
  
  </div>
  </div>
}

export default Signup