import React, { useState } from "react";

export default function Bibli(props) {
  const [biblias, setBiblias] = useState(null);

  const selectBook = (versions) => {
    let book = props.BookAll.filter((x) => x.version === versions);
    setBiblias(book);
  };

  return (
    <div className="container mt-5">
      <div className="container mt-5">
        <h6>Seleccione una version</h6>

        <div className="d-flex justify-content-start">
          {props.versiones.map((itm) => (
            <button
              key={itm._id}
              className="btn-select-biblia"
              onClick={() => selectBook(itm.versionBible)}
            >
              {itm.versionBible}
            </button>
          ))}
        </div>
      </div>

      <div className="box-per">
        {biblias !== null && (
          <table className="table mt-5">
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
              {biblias.map((itm, idx) => (
                <tr key={itm._id}>
                  <th scope="row">{idx + 1}</th>
                  <td>{itm.nomenclatura}</td>
                  <td>{itm.book}</td>
                  <td>{itm.capitulos.length}</td>
                  <td>{itm.version}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
