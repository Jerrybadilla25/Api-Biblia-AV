import React from "react";
import { useState } from "react/cjs/react.development";
import Subcapitulos from '../formulario/SubCapitulos';

export default function Bibli(props) {

  const http = " http://localhost:4200";
  const [capitulos, setCapitulos]= useState([]);

  const charter = async (id)=>{
        const data = await fetch(`${http}/books/getLibroCapitulo`,{
            method: "POST",
            body: JSON.stringify({id: id}),
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
              },
        });
        const res = await data.json();
        setCapitulos(res);
  }

  return (
    <div>
        <div>
            {
                props.BookAll.map((itm)=>(
                   <button 
                   key={itm._id}
                   onClick={()=>charter(itm._id)}
                   >{itm.book}</button> 
                ))
            }
            
        </div>

        {capitulos._id && <Subcapitulos capitulos={capitulos}/>}
        
    </div>  
  );
  
}

