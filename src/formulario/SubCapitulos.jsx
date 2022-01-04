import React from 'react'

export default function SubCapitulos(props) {
    return (
        <div>
            <h4>{}</h4>
            {
                props.capitulos.capitulos.map(itm =>(
                    <div key={itm._id}>
                       <h4 >{itm.charter}</h4> 
                       {
                           itm.versiculos.map(ver =>(
                               <p key={ver._id}>
                                   <h4>{ver.title}</h4>
                                   {ver.numero}-{ver.versiculo}
                               </p>
                           ))
                       }
                    </div>
                    
                    
                ))
            }
        </div>
    )
}
