import React, { ChangeEvent, useState } from "react";
import { FiEdit, FiPlus } from "react-icons/fi";
import { BsEyeFill, BsTrash } from "react-icons/bs";
import { useAuth, useFirestore, useFirestoreCollection } from "reactfire";
import moment from 'moment';
import 'firebase/firestore'
import 'moment/locale/es';
function CategoriesList() {
  const auth = useAuth();
  const categoriesRef = useFirestore().collection('categories').where('CreateBy','==', auth.currentUser?.uid || "");
  const jkl:any = useFirestoreCollection(categoriesRef);
  const {docs} = jkl.data || "";
  const [search, setSearch] = useState("")
  const [load, setLoad] = useState(true)
  const handlerInputChange = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    setSearch(e.target.value);
    setLoad(!load)
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
      <div className="form-group col-lg-1"></div>
      <div className="row mb-4">
        <div className="form-group col-lg-2">
          <label className="col-form-label" htmlFor="inputDefault">
            Buscar Categoria:{" "}
          </label>
        </div>
        <div className="form-group col-lg-4">
          <input
            type="text"
            className="form-control"
            placeholder="Ingresar nombre de la categoria"
            id="inputDefault"
            onChange={handlerInputChange}
          />
        </div>
        <div className="form-group col-lg-2"></div>
        <br />
        <div className="form-group col-lg-3">
          <button
            type="button"
            onClick={() => (window.location.href = "categoriesform")}
            className="btn btn-primary"
          >
            Nueva Categoria <FiPlus />{" "}
          </button>
        </div>
      </div>
      <br />
      <div className="card border-primary mb-3" style={{ width: 1000 }}>
        <div className="card-header">Categorias</div>
        <div className="card-body">
          <table className="table table-striped">
            <thead>
              <tr>
              <th scope="col" style={{width:"4%"}}>#</th>
                <th scope="col" style={{width:"18%"}}>Categoria</th>
                <th scope="col" style={{width:"40%"}}>Descripcion</th>
                <th scope="col" style={{width:"18%"}}>Fecha de creación</th>
                <th scope="col" style={{width:"18%"}}>... Opciones... </th>
              </tr>
            </thead>
            {docs?.map((category:any, i:number) => {
                 if (!category.data().CategoryName.indexOf(search)) {
                    return (
                      <tbody key={i}>
                        <tr>
                          
                          <td>{i+1}</td>
                          <td>{category.data().CategoryName}</td>
                          <td>{category.data().Description}</td>
                          <td>{moment(new Date(category.data().CreateAt.seconds*1000)).format('LL')}</td>
                          <td>
                          <button
                             
                              style={{ marginRight: 5 }}
                              className="btn btn-info btn-sm"
                              onClick={() => window.location.href=`/questionbank/${category.id}`
                              }
                            >
                              {" "}
                              <BsEyeFill />
                            </button>
                            <button
                              className="btn btn-warning btn-sm"
                              style={{ marginRight: 5 }}
                             
                            >
                              {" "}
                              <FiEdit style={{ color: "#fff" }} />
                            </button>
                            <button
                              /*onClick={() =>
                                user._id && handleDelete(user._id)
                              }*/
                              style={{ marginRight: 5 }}
                              className="btn btn-danger btn-sm"
                            >
                              {" "}
                              <BsTrash />
                            </button>
                            
                          </td>
                        </tr>
                      </tbody>
                    );
                  }
                })}
          </table>
        </div>
      </div>
    </div>
  );
}

export default CategoriesList;
