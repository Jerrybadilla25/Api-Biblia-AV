import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import {getStart} from '../fecthing';

const VerseDiaManual = (props) => {
  const [books, setBooks] = useState(null);
  const [charter, setCharter] = useState(null);
  const [verse, setVerse] = useState(null);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  React.useEffect(() => {
    let date = props.BookAll.filter((x) => x.version === "Reina_Valera_1960");
    setBooks(date);
  }, []);

  const onSubmit = async () => {
    let data = watch();
    if(data.numero){
      let idx = parseInt(data.capitulo, 10)-1
      let id = charter.capitulos[idx]
      data.capitulo = id
      let send =await getStart(data, props.user.token)
      if(send){
        setVerse(send)
        setCharter()
        reset({
          capitulo: "",
          libro: "",
          numero: ""
        });
      }else{

      }
        
        
    }else{
        let filter2 = books.find((x) => x.book === data.libro);
        setCharter(filter2);
    }
  };

  return (
    <div className="mx-5 my-5">
      <h4>Cargar versiculo manual</h4>
      <form className="form-per" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          {books && (
            <div>
              <label htmlFor="" className="form-group label">
                Libro
              </label>
              <select
                type="text"
                className="form-control"
                {...register("libro", { required: "Seleccione una opcion" })}
              >
                <option></option>

                {books.map((item) => (
                  <option className="form-control" key={item._id}>
                    {item.book}
                  </option>
                ))}
              </select>
              <div className="text-form-message">{errors.libro?.message}</div>
              {charter && (
                <div className="form-group">
                  <label htmlFor="">Capitulo</label>
                  <select
                    type="text"
                    className="form-control"
                    {...register("capitulo", {
                      required: "Seleccione una opcion",
                    })}
                  >
                    <option></option>
                    {charter.capitulos.map((x, idx) => (
                      <option key={x}>{idx + 1}</option>
                    ))}
                  </select>
                  <div className="text-form-message">
                    {errors.capitulo?.message}
                  </div>
                  <div className="form-group">
                    <label htmlFor="Versiculo">Versiculo</label>
                    <input 
                    type="number" 
                    name="numero"
                    className="form-control"
                    {...register("numero", {
                        required: "Seleccione una opcion",
                      })}
                    />
                    <div className="text-form-message">{errors.numero?.message}</div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <button type="submit" className="btn-select-form mt-3">
          Actualizar
        </button>
      </form>

      <div className="my-3 mx-5 d-flex justify-content-around">
               {
                   verse && (
                       <div>
                         <p>{verse.numero}  {verse.versiculo}</p>
                         <h6>{verse.originCharter}</h6>
                         <h5>{verse.testament}</h5>
                      </div>
                   )
               }
               
           </div>



    </div>
  );
};

export default VerseDiaManual;
