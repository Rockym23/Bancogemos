import React from 'react'

function TemplateCard() {
  return (
    <div className="card " style={{width: '50rem'}}>
    <img src="bankLogo.png" class="card-img-top" alt="BANCO GEMOS"></img>
<div className="card-header text-white bg-primary border-primary mb-3">Bienvenidos a BANCO GEMOS</div>
<div className="card-body ">
<p className="card-text">El mejor banco de México y el Mundo, donde puedes hacer depositos, retiros y consultar información relevante de las finanzas.</p>
<p>Si deseas crear una cuenta presiona el botón que esta a continuación </p>
<a href="#" className="btn btn-primary">Crear Cuenta</a>
</div>
</div>
  )
}

export default TemplateCard


//<img src="..." class="card-img-top" alt="...">