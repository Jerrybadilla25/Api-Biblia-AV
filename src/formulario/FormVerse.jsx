import React, { useState } from "react";
import Verses from '../Vistas/VerseAdd';
import Msj from '../Vistas/Msj';

export default function FormVerse() {
  const http = " http://localhost:4200";
  const [verse, setVerse] = useState({});
  const [charter2, setCharter2] = useState([]);
  const [versiculos, setVersiculos] = useState([]);
  const [msj, setMsj] = useState({});
  const handleInputChangeRegister = (e) => {
    setVerse({
      ...verse,
      [e.target.name]: e.target.value,
    });
  };

  //cargar capitulos al llamar la vista
  React.useEffect(() => {
    cargaCapi();
  }, []);

  //cargar datos de los capitulos
  const cargaCapi = async () => {
    const data = await fetch(`${http}/books/getCharter`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const res = await data.json();
    setCharter2(res);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const data = await fetch(`${http}/books/addverse`, {
      method: "POST",
      body: JSON.stringify(verse),
      headers: {
        "Content-Type": "application/json",
         Accept: "application/json",
      },
    });
    //cargaCapi();
    const datosJ = await data.json();
    //pendiente revisar este dato
    setVersiculos(datosJ.data1);
    setMsj(datosJ.msj);
    //e.target.reset();
    
  };


  return (
    <div>
      <div className="mx-5 my-5">
        {msj.msj && <Msj msj={msj}/>}
        <div>
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <label>Seleccione libro y capitulo</label>
              <select
                className="form-control"
                name="libroCapitulo"
                onChange={handleInputChangeRegister}
              >
                {charter2.map((itm) => (
                  <option key={itm._id} className="form-control">
                    {itm.charter}
                  </option>
                ))}
              </select>

              <label htmlFor="exampleInputEmail1">Ingrese titulo</label>
              <input
                type="text"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                name="title"
                onChange={handleInputChangeRegister}
                placeholder="si exixte subtitulo coloquelo aqui"
              />
              <label htmlFor="exampleInputEmail1">Ingrese numero</label>
              <input
                type="number"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                name="numero"
                onChange={handleInputChangeRegister}
                placeholder="ingrese numero de versiculo"
              />
              <label htmlFor="exampleInputEmail1">Ingrese el versiculo</label>
              <textarea
                rows="10"
                cols="10"
                type="text"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                name="versiculo"
                onChange={handleInputChangeRegister}
                placeholder="copie el versiculo aqui, de uno por uno"
                textarea
              />
              <label >Seleccione la version</label>
            <select
            className="form-control"
            name="version"
            onChange={handleInputChangeRegister}
            >
              <option  ></option>
              <option >RV 1960</option>
            </select>
            <label >Seleccione el testamento</label>
            <select
            className="form-control"
            name="testament"
            onChange={handleInputChangeRegister}
            >
              <option  ></option>
              <option >Antiguo testamento</option>
              <option >Nuevo testamento</option>
            </select>
              <button type="submit" className="btn btn-primary">
                Guardar versiculo
              </button>
            </div>
          </form>
        </div>
      </div>

      {versiculos._id && <Verses versiculos={versiculos}/>}

    </div>
  );
}
