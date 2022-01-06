import React from "react";
import toast, { Toaster } from "react-hot-toast";
import { useForm } from "react-hook-form";

export default function FormBook(props) {
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

  const onSubmit = async () => {
    const book = watch();
    console.log(book);
    const data = await fetch(`${props.http}/books/books`, {
      method: "POST",
      body: JSON.stringify(book),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "x-access-token": props.user.token
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
            <label for="exampleInputPassword1">Orden de libro</label>
            <input
              type="number"
              className="form-control"
              id="exampleInputPassword1"
              name="order"
              {...register("order", { required: "Este campo es requerido" })}
            />

            <div className="text-form-message">{errors.order?.message}</div>
          </div>
          <label>Seleccione la version</label>
          <select
            className="form-control"
            name="version"
            {...register("version", { required: "Seleccione una opcion" })}
          >
            <option></option>
            <option>RV1960</option>
          </select>
          <div className="text-form-message">{errors.version?.message}</div>
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

          <button type="submit" className="btn-select-form mt-3">
            Guardar libro
          </button>
        </form>
      </div>

      <div className="container mb-5 mt-3">
        <div>
          {props.BookAll && (
            <div>
              <h3>Libros creados</h3>
              <div className="d-flex-per">
                {props.BookAll.map((itm, idx) => (
                  <div key={itm._id}>
                    <button className="btn btn-outline-primary mx-1 my-1">
                      {idx + 1}-{itm.book}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <Toaster />
    </div>
  );
}
