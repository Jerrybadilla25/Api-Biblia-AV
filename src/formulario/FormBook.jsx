import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useForm } from "react-hook-form";

export default function FormBook(props) {
  const [books, setBooks] = useState(null);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

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

  const selectVersionBiblia = (versions) => {
    const data = props.BookAll.filter((x) => x.version === versions);
    setBooks(data);
  };

  const onSubmit = async () => {
    const userID = { userCreator: props.user.user };
    const formdata = watch();
    let idversiones = props.versiones.filter(
      (x) => x.versionBible === formdata.version
    );
    let idVersion = { idBook: idversiones[0]._id };
    const book = Object.assign(userID, formdata, idVersion);
    const data = await fetch(`${props.http}/books/books`, {
      method: "POST",
      body: JSON.stringify(book),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "x-access-token": props.user.token,
      },
    });
    const res = await data.json();
    notify(res.mesage);
    props.cargaBook();
    reset({
      book: "",
      nomenclatura: "",
      order: "",
      version: "",
      testament: "",
    });
  };

  return (
    <div>
      <div className="container">
        <form onSubmit={handleSubmit(onSubmit)} className="form-per">
          <div className="form-group">
            <label>Ingrese Libro</label>
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              name="book"
              placeholder="Ejm: Genesis"
              {...register("book", { required: "Este campo es requerido" })}
            />

            <div className="text-form-message">{errors.book?.message}</div>
          </div>
          <div className="form-group">
            <label>nomenclatura</label>
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              name="nomenclatura"
              placeholder="Gn"
              {...register("nomenclatura", {
                required: "Este campo es requerido",
              })}
            />

            <div className="text-form-message">
              {errors.nomenclatura?.message}
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Orden de libro</label>
            <input
              type="number"
              className="form-control"
              id="exampleInputPassword1"
              name="order"
              {...register("order", { required: "Este campo es requerido" })}
            />

            <div className="text-form-message">{errors.order?.message}</div>
          </div>

          {props.versiones !== null && (
            <div className="form-group">
              <label>Seleccione la version</label>

              <select
                className="form-control"
                name="version"
                {...register("version", { required: "Seleccione una opcion" })}
              >
                <option></option>

                {props.versiones.map((itm) => (
                  <option key={itm._id} className="form-control">
                    {itm.versionBible}
                  </option>
                ))}
              </select>

              <div className="text-form-message">{errors.version?.message}</div>
            </div>
          )}
          <div className="form-group">
            <label>Seleccione el testamento</label>
            <select
              className="form-control"
              name="testament"
              {...register("testament", { required: "Seleccione una opcion" })}
            >
              <option></option>
              <option>Antiguo testamento</option>
              <option>Nuevo testamento</option>
            </select>
            <div className="text-form-message">{errors.testament?.message}</div>
          </div>
          <small className="text-muted">
            <p>
              <span>Usuario </span>
              {props.user.user}
            </p>
          </small>

          <button type="submit" className="btn-select-form mt-3">
            Guardar libro
          </button>
        </form>
        <div className="container mt-5">
          <h6>Seleccione una version</h6>

          <div className="d-flex justify-content-start">
            {props.versiones.map((itm) => (
              <button
                key={itm._id}
                className="btn-select-biblia"
                onClick={() => selectVersionBiblia(itm.versionBible)}
              >
                {itm.versionBible}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container mb-5 mt-3 box-per">
        <div>
          {props.BookAll && (
            <div>
              <h3 className="ml-5">Libros creados</h3>

              {books !== null && (
                <div className="d-flex-per">
                  {books.map((itm) => (
                    <div key={itm._id}>
                      <button className="btn btn-outline-primary mx-1 my-1">
                        {itm.order}-{itm.book}
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <Toaster />
    </div>
  );
}
