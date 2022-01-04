import React from 'react'


export default function HomeBook(props) {
    return (
        <div className="">
            
            <div>
              <h3>Libros recien creados</h3>
            {
                props.libros.map((itm, idx)=>(
                    <div key={idx}>
                      <p>{idx+1}-{itm}</p>  
                    </div>
                
                
                ))
            }  
            </div>
            
        </div>
    )
}
