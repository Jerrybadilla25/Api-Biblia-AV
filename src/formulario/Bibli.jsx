import React from "react";



export default function Bibli(props) {


  return (
    <div className="container mt-5">
      <table class="table">
      <thead>
        <tr>
          <th scope="col">indice</th>
          <th scope="col">Nom</th>
          <th scope="col">Libro</th>
          <th scope="col">capitulos</th>
          <th scope="col">version</th>
        </tr>
      </thead>
      <tbody>
      {
        props.BookAll.map((itm, idx) =>(
          <tr key={itm._id}>
          <th scope="row">{idx+1}</th>
          <td>{itm.nomenclatura}</td>
          <td>{itm.book}</td>
          <td>{itm.capitulos.length}</td>
          <td>{itm.version}</td>
        </tr>
        ))
      }
      </tbody>
    </table>
    </div>
    
    
  );
}
