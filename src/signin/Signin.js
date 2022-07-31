import React, { useState , useEffect } from 'react'
import {useAuth} from "../context/AuthContext"
import {useNavigate} from "react-router-dom"


function Signin() {
  const typeOfMessages = ['error' , 'warning' , 'confirmation'];

  const [resetText, setResetText] = useState('Limpiar');
  const [user, setUser] = useState({
    name: '',
    password: ''
  });
  const [message, setMessage] = useState([]);
  const [typeMessage, setType] =  useState('');

  const{signin, signInWithGoogle} = useAuth();
  const navigate = useNavigate();

  const handleChange = ({target: {name, value}}) =>{
    setUser({...user, [name]: value});
  }

  const handleSubmit = async (e) =>{
    setMessage([]);
    e.preventDefault();
    const a = signin(user.name, user.password);
    a.then(function(result){
      console.log(result);
      navigate("/");
    }, function(err){
      console.log(err.message);
      let failedMessage = [];
      if(err.message === "Firebase: Error (auth/user-not-found)."){
         failedMessage.push('Usuario no existe');
      }else if(err.message === "Firebase: Error (auth/wrong-password)."){
        failedMessage.push('Password incorrecto');
      }   
      else{
        failedMessage.push(err.message);
      }
      setMessage(failedMessage);
      setType(typeOfMessages[0])

    })
      
  };

  const HandleSignInGoogle = async (e) =>{
    setMessage([]);
    e.preventDefault();
    try{
      let loadingMessage = ["Cargando"];
      setMessage(loadingMessage);
      setType(typeOfMessages[2]);
      await signInWithGoogle();
      navigate("/");
    }
    catch(error){
      console.log(error.message);
      let failedMessage = [];
      if(error.message == "Firebase: Error (auth/popup-closed-by-user)."){
        failedMessage.push('Sign In se canceló, Intente de nuevo');
      }else{
        failedMessage.push(error.message);
      }

      setMessage(failedMessage);
      setType(typeOfMessages[0])}
     
    }
    /*const g = await signInWithGoogle(); 
    g.then(function(result){
      console.log(result);
      navigate("/");
    },  function(err){
      console.log(err.message);
      let failedMessage = [];
      if(err.message === "Firebase: Error (auth/user-not-found)."){
         failedMessage.push('Usuario no existe');
      }else if(err.message === "Firebase: Error (auth/wrong-password)."){
        failedMessage.push('Password incorrecto');
      }   
      else{
        failedMessage.push(err.message);
      }
      setMessage(failedMessage);
      setType(typeOfMessages[0])}
      )
*/

  
 

  function ResetFields(){
     setResetText('Limpiar');
     setUser({
      name: '',
      password: ''
    });
    setMessage([]);
  }


  return <div className="card " style={{width: '30rem'}}>
           
  <div className="card-header text-white bg-primary border-primary mb-3"> <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-door-open" viewBox="0 0 16 16">
  <path d="M8.5 10c-.276 0-.5-.448-.5-1s.224-1 .5-1 .5.448.5 1-.224 1-.5 1z"/>
  <path d="M10.828.122A.5.5 0 0 1 11 .5V1h.5A1.5 1.5 0 0 1 13 2.5V15h1.5a.5.5 0 0 1 0 1h-13a.5.5 0 0 1 0-1H3V1.5a.5.5 0 0 1 .43-.495l7-1a.5.5 0 0 1 .398.117zM11.5 2H11v13h1V2.5a.5.5 0 0 0-.5-.5zM4 1.934V15h6V1.077l-6 .857z"/>
</svg> <label className='titleCard'> SignIn </label></div>
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
      <input type="submit" value="Iniciar Sesion"  className="btn btn-primary" /> <br></br> <br></br>
      <input type="reset" value={resetText}  className="btn btn-primary" onClick={ResetFields} />
      </div>
  </form>
  <br></br> <br></br>
            <label>O si lo deseas puedes entrar con tu cuenta de Google</label><br></br><br></br>
            <button className="btn btn-primary" onClick={HandleSignInGoogle} > <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-google" viewBox="0 0 16 16">
  <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z"/>
</svg> Iniciar Sesion con Google</button>
  </div>
  </div>
}

export default Signin