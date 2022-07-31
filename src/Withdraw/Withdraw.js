import React, { useState , useEffect} from 'react'
import { getAllAccounts, getGraphQLData , getAccountById, updateValue} from '../services/services';
import { useAuth } from '../context/AuthContext';
import NotSignIn from '../error/NotSignIn';

function Withdraw() {

  const authContext = useAuth();
  const {isLoggedIn} = authContext;


  const typeOfMessages = ['error' , 'warning' , 'confirmation'];

  const [cuentaActual, setCuenta] = useState({Email: '' , Name: '', Saldo: 0 });
  const [idActual, setId] = useState(0);
  const [retireMoney, setRetire] = useState(0);
  const [resultDepot, setResultDepot] = useState(0);
  const [mailList, setMailList] = useState([]);
  const [retireButton, setdepotButtonStatus] = useState(true);
  
  const [typeMessage, setType] =  useState('');
  const [message, setMessage] = useState("");

  const [resetText, setResetText] = useState('Limpiar');

  useEffect(()=>{
    /*getGraphQLData(graphqlBody).then((data) => {console.log(data.data.bancos.data); setMailList(data.data.bancos.data);  });*/
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

    setRetire(parseInt(depositAmount)); 
    
    setdepotButtonStatus(false);


    console.log(retireMoney);
    console.log(cuentaActual.Saldo);


  }

  function ResetFields(){
    setCuenta({Email: '' , Name: '', Saldo: 0 });
     setdepotButtonStatus(true);
     setMessage("");
     setResetText('Limpiar');
  }

  function Retirar(event){
    event.preventDefault();
    console.log(idActual);
    console.log( cuentaActual.Saldo);
    console.log( retireMoney);
    
    if(retireMoney > cuentaActual.Saldo){
      setType(typeOfMessages[0]);
      setMessage('No puedes retirar mas de lo que tienes en tu saldo');
      return
    }

    if(retireMoney == 0){
      setType(typeOfMessages[0]);
      setMessage('No puedes retirar $0, inserta un valor mayor');
      return
    }



    setCuenta({
      ...cuentaActual,
      Saldo: cuentaActual.Saldo - retireMoney
    });

    fetch(`/account/update/${cuentaActual.Email}/-${retireMoney}`)
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
      setMessage("Retiro Fallo!.")
    })
    .finally(() =>{
            });  
            
      setType(typeOfMessages[2]);
      setMessage("Retiro Realizado Correctamente.")
      setResetText('Hacer otro retiro');
      event.preventDefault();
  }
  

  let saldo= 100;
  //console.log(mailList);
  //console.log(cuentaActual);
  console.log(cuentaActual);

  if(!isLoggedIn){
    return (<NotSignIn/>)
  }

  return (
    <div className="card " style={{width: '30rem'}}>
    
<div className="card-header text-white bg-primary border-primary mb-3"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-cash-coin" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M11 15a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm5-4a5 5 0 1 1-10 0 5 5 0 0 1 10 0z"/>
  <path d="M9.438 11.944c.047.596.518 1.06 1.363 1.116v.44h.375v-.443c.875-.061 1.386-.529 1.386-1.207 0-.618-.39-.936-1.09-1.1l-.296-.07v-1.2c.376.043.614.248.671.532h.658c-.047-.575-.54-1.024-1.329-1.073V8.5h-.375v.45c-.747.073-1.255.522-1.255 1.158 0 .562.378.92 1.007 1.066l.248.061v1.272c-.384-.058-.639-.27-.696-.563h-.668zm1.36-1.354c-.369-.085-.569-.26-.569-.522 0-.294.216-.514.572-.578v1.1h-.003zm.432.746c.449.104.655.272.655.569 0 .339-.257.571-.709.614v-1.195l.054.012z"/>
  <path d="M1 0a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h4.083c.058-.344.145-.678.258-1H3a2 2 0 0 0-2-2V3a2 2 0 0 0 2-2h10a2 2 0 0 0 2 2v3.528c.38.34.717.728 1 1.154V1a1 1 0 0 0-1-1H1z"/>
  <path d="M9.998 5.083 10 5a2 2 0 1 0-3.132 1.65 5.982 5.982 0 0 1 3.13-1.567z"/>
</svg> <label className='titleCard'>Retirar </label></div>
<div className="card-body ">
<p className="card-text">Busca el correo del usuario que deseas Retirar.</p>
        <form onSubmit={(event)=> Retirar(event)}>
            
            <label>Email: <select name="mailList" className="form-control" defaultValue={{label:'Elige un correo', value:"elige"}} onChange={(event) => LlenaDatos(event)}>
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
            <label>Cuenta: <b>{cuentaActual.Name}</b> </label>  <br></br> <br></br>
            <label>Saldo Actual: <b>${cuentaActual.Saldo}</b></label> <br></br> <br></br>
            <label>Cantidad a Retirar: $<input type="number" className="form-control" name="balance" min="1" max="100000" onChange={(event) => AmountChange(event)}></input></label><br></br> <br></br>
             <label className={(typeMessage =='error') ? "errorMessage" : "confirmationMessage"}>{message}</label><br></br> <br></br>

            <input type="submit" id="RetireButton" value="Retirar" disabled={retireButton} className="btn btn-primary" /><br></br> <br></br>
            <input type="reset" value={resetText}  className="btn btn-primary" onClick={(event) => ResetFields()}   />
        </form>
</div>
</div>
  )
}

export default Withdraw