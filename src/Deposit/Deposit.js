import React, { useState , useEffect} from 'react'
import { Navigate } from 'react-router';
//import { getAllAccounts, getGraphQLData , getAccountById, updateValue} from '../services/services';
import { useAuth } from '../context/AuthContext';
import NotSignIn from '../error/NotSignIn';

function Deposit() {

  const authContext = useAuth();
  const {isLoggedIn} = authContext;

  const typeOfMessages = ['error' , 'warning' , 'confirmation'];

  const [cuentaActual, setCuenta] = useState({Email: '' , Name: '', Saldo: 0 });
  const [idActual, setId] = useState(0);
  const [depotMoney, setDepot] = useState(0);
  const [resultDepot, setResultDepot] = useState(0);
  const [mailList, setMailList] = useState([]);
  const [depotButton, setdepotButtonStatus] = useState(true);
  const [resetText, setResetText] = useState('Limpiar');


  const [typeMessage, setType] =  useState('');
  const [mensaje, setMensaje] = useState("");

  useEffect(()=>{
    /*getGraphQLData(graphqlBody).then((data) => {console.log(data.data.bancos.data);       setMailList(data.data.bancos.data);  });*/
    
    fetch('/account/alls/mail')
    .then(response=> { 
      if(response.ok)
      {
          return response.json();
      }
      throw response;
    })
    .then(data => {
      console.log(data);
      const mails = data.map(index =>  index.email)
      console.log(mails);
      setMailList(mails);
    } )
    .catch(error => console.error("Error: " + error))
    .finally(() =>{
      console.log("Result");
      console.log(mailList); 
    });
  }, []);


  function LlenaDatos(event){
    console.log(event.target.value);
    let mailChosen = event.target.value;
    let result = {};
    let id= 0;

    fetch(`/account/findOne/${mailChosen}`)
    .then(response=> { 
      if(response.ok)
      {
          return response.json();
      }
      throw response;
    })
    .then(data => {
      result = data;
    } )
    .catch(error => console.error("Error: " + error))
    .finally(() =>{
      console.log("Result " + result.name);
      if(!result ) {
        console.log("Object not found!");
        return;
      }

      const variables = {};
      variables["Name"] = result.name;
      variables["Email"] = result.email;
      variables["Saldo"] = result.balance;
      console.log(variables);

      setCuenta(variables);
      setId(result._id);


      
    });

    /*getAllAccounts().then((data) =>{
        console.log(data.data);
        //console.log(data.data.id);
         result = data.data.filter((account) =>{
           //console.log(account.id);
           if(mailChosen === account.attributes.Email){id = account.id;}   
           return mailChosen === account.attributes.Email;
        })
        //console.log(result);


    }).finally(()=>{
      if(result.length != 1){return;}

      let cuenta = result[0];
      //console.log(cuenta.attributes);
      
      const {Name, Email, Saldo} = cuenta.attributes;

      const variables = {};
      variables["Name"] = Name;
      variables["Email"] = Email;
      variables["Saldo"] = Saldo;
      console.log(variables);

      setCuenta(variables);
      setId(id);
      
      console.log(cuentaActual);
      console.log(idActual);

      
    });
    */

       console.log(depotMoney);
      if(depotMoney > 0){
        setdepotButtonStatus(false);
      }


  }

  function ResetFields(){
    setCuenta({Email: '' , Name: '', Saldo: 0 });
     setdepotButtonStatus(true);
     setMensaje('');
     setResetText('Limpiar');
  }

  function AmountChange(event){
    console.log(event.target.value);
    let depositAmount = event.target.value;
    console.log(cuentaActual.Email);
    console.log(cuentaActual.Name);

    if( (cuentaActual.Email == '' || cuentaActual.Name == '' ) || (depositAmount <= 0) ){
       console.log("POner mensaje de valor");
       return;
  }

    setDepot(parseInt(depositAmount));
    setdepotButtonStatus(false);
  }


  function Depositar(event){

    console.log(idActual);
    console.log( cuentaActual.Saldo);
    console.log( cuentaActual.Email);
    console.log( depotMoney);
    
    setCuenta({
      ...cuentaActual,
      Saldo: cuentaActual.Saldo + depotMoney
    });
  
    fetch(`/account/update/${cuentaActual.Email}/${depotMoney}`)
    .then(response=> { 
      if(response.ok)
      {
          return response.json();
      }
      throw response;
    })
    .then(data => {
      console.log(data);
        
    } )
    .catch(error => {
      console.error("Error: " + error);
      setType(typeOfMessages[0]);
      setMensaje("Deposito Fallo.")
    })
    .finally(() =>{
            });

        
    setType(typeOfMessages[0]);
    setMensaje("Deposito Realizado Correctamente.");       
    setResetText('Hacer otro depósito');
    event.preventDefault();

  }
  


  //console.log(mailList);
  //console.log(cuentaActual);
  console.log(cuentaActual);

  if(!isLoggedIn){
    return (<NotSignIn/>)
  }

  return (
    <div className="card " style={{width: '30rem'}}>
   
<div className="card-header text-white bg-primary border-primary mb-3"> <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-piggy-bank-fill" viewBox="0 0 16 16">
  <path d="M7.964 1.527c-2.977 0-5.571 1.704-6.32 4.125h-.55A1 1 0 0 0 .11 6.824l.254 1.46a1.5 1.5 0 0 0 1.478 1.243h.263c.3.513.688.978 1.145 1.382l-.729 2.477a.5.5 0 0 0 .48.641h2a.5.5 0 0 0 .471-.332l.482-1.351c.635.173 1.31.267 2.011.267.707 0 1.388-.095 2.028-.272l.543 1.372a.5.5 0 0 0 .465.316h2a.5.5 0 0 0 .478-.645l-.761-2.506C13.81 9.895 14.5 8.559 14.5 7.069c0-.145-.007-.29-.02-.431.261-.11.508-.266.705-.444.315.306.815.306.815-.417 0 .223-.5.223-.461-.026a.95.95 0 0 0 .09-.255.7.7 0 0 0-.202-.645.58.58 0 0 0-.707-.098.735.735 0 0 0-.375.562c-.024.243.082.48.32.654a2.112 2.112 0 0 1-.259.153c-.534-2.664-3.284-4.595-6.442-4.595Zm7.173 3.876a.565.565 0 0 1-.098.21.704.704 0 0 1-.044-.025c-.146-.09-.157-.175-.152-.223a.236.236 0 0 1 .117-.173c.049-.027.08-.021.113.012a.202.202 0 0 1 .064.199Zm-8.999-.65a.5.5 0 1 1-.276-.96A7.613 7.613 0 0 1 7.964 3.5c.763 0 1.497.11 2.18.315a.5.5 0 1 1-.287.958A6.602 6.602 0 0 0 7.964 4.5c-.64 0-1.255.09-1.826.254ZM5 6.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"/>
</svg> <label className='titleCard'> Depositar </label></div>
<div className="card-body ">
<p className="card-text">Busca el correo del usuario que deseas depositar.</p>
        <form onSubmit={(event)=> Depositar(event)}>
            
            <label >Email: <select className="form-control" name="mailList" defaultValue={{label:'Elige un correo', value:"elige"}} onChange={(event) => LlenaDatos(event)}>
                              <option value="elige" >Elige un correo</option>
                              {
                                mailList.map((email) =>{
                                  //console.log(email.attributes.Email);
                                  let mail = email;
                                  return (<option key={email} value={mail}>{mail}</option>)
                                })
                              }
                          </select>

              </label> <br></br> <br></br>
            <label >Cuenta:         <b>  {cuentaActual.Name} </b> </label>  <br></br> <br></br>
            <label >Saldo Actual:   <b> ${cuentaActual.Saldo} </b></label> <br></br>  <br></br>
            <label >Cantidad a Depositar: $<input className="form-control" type="number" name="balance" min="1" max="100000" onChange={(event) => AmountChange(event)}></input></label><br></br> <br></br>
             <label className="confirmationMessage">{mensaje}</label><br></br> <br></br>

            <input type="submit" id="DepotButton" value="Depositar" disabled={depotButton} className="btn btn-primary" /> <br></br> <br></br>
            <input type="reset" value={resetText}  className="btn btn-primary" onClick={(event) => ResetFields()}   />
        </form>
</div>
</div>
  )
}

export default Deposit