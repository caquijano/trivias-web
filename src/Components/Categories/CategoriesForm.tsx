import React, { ChangeEvent, FormEvent, useState } from "react";
import { useAuth, useFirestore } from "reactfire";
import { Categories } from "./Categories";
import "firebase/firestore";
import { toast } from "react-toastify";

function CategoriesForm() {
  const db = useFirestore();
  const auth = useAuth();
  const initialState = {
    categoryName: "",
    description: "",
    photoCategory: "",
    createAt: "",
    CreateBy: "",
  };

  const [categories, setCategories] = useState<Categories>(initialState);
  const handlerInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setCategories({ ...categories, [e.target.name]: e.target.value });
  };
  const handlSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      categories.categoryName &&
      categories.description &&
      categories.photoCategory
    ) {
      saveCategory();
    } else {
      toast.error("Todos los campos son requeridos");
    }
  };
  const saveCategory = async () => {
    await db.collection("categories").add({
      CategoryName: categories.categoryName,
      Description: categories.description,
      PhotoCategory: categories.photoCategory,
      CreateBy: auth.currentUser?.uid,
      CreateAt: new Date(),
    }).then(() => {
      window.location.href = "/categories";
      toast.success("Categoria "+ categories.categoryName +" Creada satisfactoriamente");
    })
    .catch(() => {
      toast.error("Upps ocurrieron problemas");
    });
  };

  return (
    <div
      className=" row p-5"
      style={{
        alignItems: "center",
        alignContent: "center",
        width: "100%",
        justifyContent: "center",
      }}
    >
      <div className="card body" style={{ width: "85%" }}>
        <div className="card-header">
          <h4 className="card-title">Nueva Categoria</h4>
        </div>
        <div className="card-body">
          <form onSubmit={handlSubmit} className="form-horizontal">
            <fieldset>
              <div className="mb-3 row form-group">
                <div className="col-lg-1  "></div>
                <label className="col-lg-3 control-label">
                  Nombre de la categorias:{" "}
                </label>
                <div className="col-lg-7">
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="categoryName"
                    placeholder="Categoria"
                    onChange={handlerInputChange}
                  />
                </div>
              </div>
              <div className="mb-3 row form-group">
                <div className="col-lg-1"></div>
                <label htmlFor="textArea" className="col-lg-3 control-label">
                  Descripción
                </label>
                <div className="col-lg-7">
                  <textarea
                    className="form-control"
                    rows={3}
                    name="description"
                    id="description"
                    defaultValue={""}
                    onChange={handlerInputChange}
                  />
                </div>
              </div>

              <div className="mb-3 row form-group">
                <div className="col-lg-1"></div>
                <label className="col-lg-3 control-label">Foto</label>
                <div className="col-lg-7">
                  <input
                    type="text"
                    name="photoCategory"
                    className="form-control"
                    placeholder="Foto"
                    onChange={handlerInputChange}
                  />
                </div>
              </div>
              <div className="form-group">
                <div style={{width:"100%", alignItems:"center", justifyContent:"center", textAlign:"center"}}>
                  <button type="submit" className="btn btn-primary" style={{width:"20%"}}>
                    Agregar
                  </button>
                </div>
              </div>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CategoriesForm;
