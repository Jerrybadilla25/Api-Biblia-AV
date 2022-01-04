import React from "react";

export default function SelectForm(props) {
  return (
    <div>
      <div className="select-form-p mt-3">
        <h2>Cargar datos en la api-Biblia</h2>
        <p>
          En esta seccion seleccionamos que dato queremos cargar, ya se <strong>Book</strong>  para cargar nombre de libro, <strong>Charter</strong>  para cargar libro mas capitulo y <strong>Verse</strong>  para cargar versiculo.
        </p>
      </div>
      
        <div className="my-3 mx-5 d-flex justify-content-around">
          <button className="btn btn-primary mx-1" onClick={props.libro}>
            Book
          </button>
          <button className="btn btn-primary mx-1" onClick={props.capitulo}>
            Charter
          </button>
          <button className="btn btn-primary mx-1" onClick={props.versiculo}>
            Verse
          </button>
          <button className="btn btn-primary mx-1" onClick={props.Bibliaapp}>
            Biblia
          </button>
        </div>
      
    </div>
  );
}
