import React, { useState , useEffect } from 'react'
import {createNewAccount, getGraphQLData} from '../services/services';
import '../App.css';
import { useAuth } from '../context/AuthContext';
import NotSignIn from '../error/NotSignIn';


function Createacc(){

    const authContext = useAuth();
  const {isLoggedIn} = authContext;


    const typeOfMessages = ['error' , 'warning' , 'confirmation'];

    const[result, setResult] = useState({});
    const[mailList, setMailList] = useState([]);
    const [message, setMessage] = useState([]);
    const [typeMessage, setType] =  useState('');
    const [resetText, setResetText] = useState('Limpiar');


    const graphqlBody = `query bancos{
        bancos{
            data{
            id
            attributes{
              Email
            }
          }
          }
      }`;

      //console.log(graphqlBody);
    useEffect(()=>{
        /*getGraphQLData(graphqlBody).then((data) => {
          
          console.log(data.data.bancos.data);
          setMailList(data.data.bancos.data);
          //console.log(mailList[0].id );
          //console.log(mailList[0].attributes.Email );
          
        });*/
        fetch('/account/all')
        .then(response=> { 
          if(response.ok)
          {
              return response.json();
          }
          throw response;
        })
        .then(data => setMailList(data))
        .catch(error => console.error("Error: " + error))
        .finally(() =>{
          console.log("Result");
          console.log(mailList); 
        });
      }, []);


    var datosIncorrectos = false;

    function validarEmail(email) 
    {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
    }

    function validarNip(password){
        var re = /^(\d{4})$/;
        return re.test(password);
    }

    function validarRepetido(email, mailList){
        //const equalEmail = (element) => element.attributes.Email === email;
        return false;//mailList.some(equalEmail);  

    }

    function ValidarCampos(name, email, balance, password){

        let atLeastOneError= false;
        let message = [`No se pudo crear la cuenta, debes hacer las siguientes correcciones: `];

        //Validar el nombre
        if(name == ''){
            console.log('nombre vacio');
            message.push(` Inserta un Nombre`);
            atLeastOneError = true;
        }

        //Validar correo
        if(email == ''){
            console.log('mail vacio');
            message.push(` Inserta un Correo`);
            atLeastOneError = true;
        }

        if(!validarEmail(email) && email != ''){
            console.log('mail invalido');
            message.push(` El correo es invalido, asegura que tenga la forma nombre@dominio.com`);
            atLeastOneError = true;
        }

        if(validarRepetido(email, mailList)){
            console.log('mail repetido');
            message.push(` Ya existe un correo registrado, por favor elige uno diferente`);
            atLeastOneError = true;
        }

        //Validar Password
        if(password == ''){
            console.log('Password/Nip vacio');
            message.push(` El password no debe estar vacío, inserte un NIP de 4 numeros`);
            atLeastOneError = true;
        }

        if(!validarNip(password) && password != ''){
            console.log('Password/Nip invalido');
            message.push(` El password solo debe contener 4 digitos`);
            atLeastOneError = true;
        }

        //Validar Saldo
        if(balance == ''){
            console.log('Balance vacio');
            message.push(` Inserta un saldo válido`);
            atLeastOneError = true;
        }

        if(balance < 0){
            console.log('Balance negativos');
            message.push(` No puedes crear una cuenta con saldo negativo`);
            atLeastOneError = true;
        }

        if(atLeastOneError){
            setType(typeOfMessages[0]);
            setMessage(message);
            datosIncorrectos = true;
        }

        
            
    }


    function ResetFields(){
        //setCuenta({Email: '' , Name: '', Saldo: 0 });
         //setdepotButtonStatus(true);
         setResetText('Limpiar');
         setMessage([]);
      }

    function CrearCuenta(event){
        event.preventDefault();
        let name = event.target.name.value;
        let email = event.target.email.value;
        let balance = event.target.balance.value;
        let password = event.target.password.value;

        
        ValidarCampos(name, email, balance, password);    
        console.log(datosIncorrectos);
        if(datosIncorrectos){
           return;
        }

        fetch(`/account/create/${name}/${email}/${password}/${balance}`)
        .then(response=> { 
          if(response.ok)
          {
              return response.json();
          }
          throw response;
        })
        
        .catch(error => console.error("Error: " + error))
        .finally(() =>{
          console.log("Finished Creation");
          //console.log(Allaccounts); 
        });


        /*let registry= { 
            data:{
                Name: name,
                Email: email,
                Saldo: balance
            }
        }
        console.log(registry);

        createNewAccount(registry).then((response) =>{
            console.log(`Response: ${response.data}`);
            setResult(response.data);
            let successMessage = ["Se ha creado la cuenta correctamente"];
            setMessage(successMessage);
            setType(typeOfMessages[2])
        }).catch((error) => {
            console.log(`Post Failed: ${error}`);
        })*/
        //Validate if Registry is not repeated on strapi
        //If yes cancel creation
        //If not create account by using axios.post
        let successMessage = ["Se ha creado la cuenta correctamente"];
        setMessage(successMessage);
        setType(typeOfMessages[2])
        setResetText('Crear otra cuenta');
        event.preventDefault();
    }

    console.log(mailList);
    console.log(typeMessage);
    console.log(message);

    if(!isLoggedIn){
        return (<NotSignIn/>)
      }
  //  console.log(mailList[0].attributes.Email);
    return(
        <div className="card " style={{width: '30rem'}}>
           
        <div className="card-header text-white bg-primary border-primary mb-3"> <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-person-bounding-box" viewBox="0 0 16 16">
  <path d="M1.5 1a.5.5 0 0 0-.5.5v3a.5.5 0 0 1-1 0v-3A1.5 1.5 0 0 1 1.5 0h3a.5.5 0 0 1 0 1h-3zM11 .5a.5.5 0 0 1 .5-.5h3A1.5 1.5 0 0 1 16 1.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 1-.5-.5zM.5 11a.5.5 0 0 1 .5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 1 0 1h-3A1.5 1.5 0 0 1 0 14.5v-3a.5.5 0 0 1 .5-.5zm15 0a.5.5 0 0 1 .5.5v3a1.5 1.5 0 0 1-1.5 1.5h-3a.5.5 0 0 1 0-1h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 1 .5-.5z"/>
  <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
</svg> <label className='titleCard'> Crear Cuenta </label></div>
        <div className="card-body ">
        <p className="card-text">Inserta los siguientes datos.</p>
        <form onSubmit={CrearCuenta}>
            <div className="form-group">
            <label >Nombre: <input className="form-control" type="text" name="name"></input></label> <br></br> <br></br>
            </div>
            <div className="form-group">
            <label >Email: <input type="text" className="form-control" placeholder="name@example.com" name="email"></input></label> <br></br> <br></br>
            </div>
            <div className="form-group">
            <label >Password(NIP): <input type="password" className="form-control" name="password" pattern="[0-9]{4}" maxLength="4" ></input></label> <br></br> <br></br>
            </div>
            <div className="form-group">
            <label >Saldo Inicial: $<input type="number" className="form-control" name="balance" min="0"></input></label> <br></br> 
            </div>
            <div className="form-group">
            <ul className={(typeMessage =='error') ? "errorMessage" : "confirmationMessage"}>{
            message.map((mensaje, index) => {
                return (<li key={index}>{mensaje}  </li>)
            })
            
            }</ul> <br></br>
            <input type="submit" value="Crear Cuenta"  className="btn btn-primary" /> <br></br> <br></br>
            <input type="reset" value={resetText}  className="btn btn-primary" onClick={(event) => ResetFields()} />
            </div>
        </form>
        
        </div>
        </div>
    );
}

export default Createacc;