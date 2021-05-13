import moment from "moment";
import React from "react";
import { FiEdit } from "react-icons/fi";
import { BsEyeFill, BsTrash } from "react-icons/bs";
import { useParams } from "react-router";
import {
  useAuth,
  useFirestore,
  useFirestoreCollection,
  useFirestoreDocData,
} from "reactfire";

function QuestionBank() {
  interface Params {
    id?: any;
  }
  const params = useParams<Params>();
  const auth = useAuth();
  //Llamado de categoria enviada
  const categoriesRef = useFirestore().collection(`categories`).doc(params.id);
  const cat: any = useFirestoreDocData(categoriesRef);
  const { CategoryName, CreateAt, Description, PhotoCategory } = cat.data || "";
  //Llamado de las preguntas
  const questionsRef = useFirestore()
    .collection(`questions`)
    .where("IdCategory", "==", params.id);
  const quest: any = useFirestoreCollection(questionsRef);
  const { docs } = quest.data || "";

  return (
    <>
      <div
        className="card mb-3"
        style={{ maxWidth: "90%", marginInline: "5%", marginTop: 20 }}
      >
        <div className="row g-0">
          <div className="col-md-4">
            <img style={{ width: "100%" }} src={PhotoCategory} alt="..." />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">{CategoryName} </h5>
              <p className="card-text">{Description} </p>
              <p className="card-text">
                <small className="text-muted">
                  Creado{" "}
                  {moment(
                    new Date(CreateAt?.seconds * 1000),
                    "YYYYMMDD"
                  ).fromNow()}
                </small>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div
        className="card text-left"
        style={{ maxWidth: "90%", marginInline: "5%", marginBottom: 20 }}
      >
        <div className="card-header"  style={{textAlign:"center"}}><h5>Banco de Preguntas</h5> </div>
        <button
          type="button"
          className="btn btn-link"
          onClick={() => (window.location.href = `/questionform/${params.id}`)}
        >
          Crear nueva pregunta
        </button>
        <div className="card-body">
          <table className="table">
            <thead>
              <tr>
                <th>Pregunta</th>
                <th>Respuesta</th>
              </tr>
            </thead>
            <tbody>
              {docs?.map((element:any, index:number)=>{
                return(
                <tr key={index}>
                <td>{element.data().Question}</td>
                <td>{element.data().CorrectAnswer}</td>
              </tr>
              )})
              }
            </tbody>
          </table>
        </div>
        <div className="card-footer text-muted">Calificación 4.3/5.0</div>
      </div>
    </>
  );
}

export default QuestionBank;
