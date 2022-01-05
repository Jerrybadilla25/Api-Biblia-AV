import React from "react";
import { useState, useEffect } from "react/cjs/react.development";
import Subcapitulos from "../formulario/SubCapitulos";

export default function Bibli(props) {
  const http = " http://localhost:4200";
  const [capitulos, setCapitulos] = useState([]);

  useEffect(() => {
    charter();
  }, []);

  const charter = async (id) => {
    const data = await fetch(`${http}/books/books/populate`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const res = await data.json();
    setCapitulos(res);
  };

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
        capitulos.map((itm, idx) =>(
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
