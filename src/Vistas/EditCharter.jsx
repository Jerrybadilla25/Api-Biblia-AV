import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function EditCharter(props) {
  const [books, setBooks] = useState({});
  const [charter, setCharter] = useState({});
  const [editVerse, setEditVerse] = useState({});

  //toaster
  const notify = (mesage) =>
    toast.success(`${mesage}`, {
      duration: 5000,
      position: "top-center",
      style: {
        background: "#080808",
        color: "#ffffff",
      },
    });


  //edit formcharter
  const capturarEditVerses = (e) => {
    setEditVerse({
      ...editVerse,
      [e.target.name]: e.target.value,
    });
  };

  const editarVersiculo = async (id)=>{
      //let newVersiculo = {versiculo: editVerse.versiculo}
      let verseSelect = charter.verses.filter(x=> x._id === id);
      let {_id, numero, version, testament}=verseSelect[0];
      let datos = {
        _id:_id, numero: numero, version: version, testament: testament, versiculo:editVerse.versiculo
      }
      const data = await fetch(`${props.http}/books/editVerses`,{
        method: "POST",
        body: JSON.stringify(datos),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "x-access-token": props.user.token
        },

      });
      const res = await data.json();
      notify(res.mesage);

  }


  const selectBook = async (id) => {
    const data = await fetch(`${props.http}/books/editGetCharter/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "x-access-token": props.user.token
      },
    });
    const res = await data.json(data);
    setBooks(res);
  };

  const selectChater = async (id) => {
    const data = await fetch(`${props.http}/books/editCharter/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "x-access-token": props.user.token
      },
    });
    const res = await data.json();
    setCharter(res);
  };

  const deleteCharter= async(id)=>{
      const data = await fetch(`${props.http}/books/editCharter/${id}`,{
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "x-access-token": props.user.token
            },
      });
      const res = await data.json();
      setCharter({});
      setBooks({});
      notify(res.mesage);
  }

  return (
    <div className="container my-5 py-5 line-color-top">
      <div className="row">
        <div className="col-sm-3 ">
          <h5>Libros</h5>
          <ul className="list-group box-per">
            {props.BookAll.map((itm) => (
              <div key={itm._id} onClick={() => selectBook(itm._id)}>
                <li className="list-group-item">{itm.book}</li>
              </div>
            ))}
          </ul>
        </div>

        <div className="col-sm-3">
          {books.capitulos && (
            <div>
              <h5>Capitulos</h5>
              <ul className="list-group box-per">
                {books.capitulos.map((itm) => (
                  <div key={itm._id} onClick={() => selectChater(itm._id)}>
                    <li className="list-group-item">
                      {itm.charter} 
                    </li>
                  </div>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="col-sm-6">
          {charter.verses && (
            <div>
              <div>
                  <div className="d-flex justify-content-around">
                    <h5>{charter.charter}</h5>
                    <i className="bi bi-trash icon-delete" onClick={()=>deleteCharter(charter._id)}></i>
                  </div>
                
                <div className="box-per">
                  {charter.verses.map((itm) => (
                    <div key={itm._id} className="d-flex flex-column mt-5 box-edit-verse">
                      <div className="d-flex justify-content-between" >
                        <strong className="btn-edit-verse" >{itm.numero}</strong>
                        <button 
                        className="btn-edit-verse"
                        onClick={()=>editarVersiculo(itm._id)}
                        >Guardar los cambios</button>
                      </div>
                      
                      <textarea 
                      className="input-edit-verse"
                      defaultValue={itm.versiculo}
                      onChange={capturarEditVerses}
                      name="versiculo" 
                      cols="10" 
                      rows="10">
                      </textarea>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Toaster />
    </div>
  );
}

/*
<p>
                        {itm.numero} {itm.versiculo}
                      </p>
*/