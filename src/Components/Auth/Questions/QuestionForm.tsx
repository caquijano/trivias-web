import React, { ChangeEvent, FormEvent, useState } from 'react'
import { toast } from "react-toastify";
import { useAuth, useFirestore } from 'reactfire';
import {Question} from "./Question";
import "firebase/firestore";
import { useParams } from 'react-router';

function QuestionForm() {
  interface Params {
    id?: any;
  }
  const params = useParams<Params>();
  const db = useFirestore();
  const auth = useAuth();
  const initialState = {
    question: "",
    correctAnswer: "",
    inCorrectAnswer1: "",
    inCorrectAnswer2: "",
    inCorrectAnswer3: "",
    multimedia:"",
    createAt: "",
    CreateBy: "",
  };

  const [question, setQuestion] = useState<Question>(initialState)
  const handlerInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setQuestion({ ...question, [e.target.name]: e.target.value });
  };
  const handlSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      question.question &&
      question.correctAnswer &&
      question.inCorrectAnswer1 &&
      question.inCorrectAnswer2 &&
      question.inCorrectAnswer3 
    ) {
      saveQuestion();
    } else {
      toast.error("Todos los campos son requeridos");
    }
  };
  const saveQuestion = async () => {
    await db.collection("questions").add({
      Question: question.question,
      CorrectAnswer: question.correctAnswer,
      IncorrectAnswer1: question.inCorrectAnswer1,
      IncorrectAnswer2: question.inCorrectAnswer2,
      IncorrectAnswer3: question.inCorrectAnswer3,
      Multimedia: question.multimedia,
      IdCategory: params.id,
      CreateBy: auth.currentUser?.uid,
      CreateAt: new Date(),
    }).then(() => {
      window.location.href=`/questionbank/${params.id}`;
      toast.success("Pregunta Creada satisfactoriamente");
    })
    .catch(() => {
      toast.error("Upps ocurrieron problemas");
    });
  };
    return (
        <div className="card body" style={{ width: "90%", marginInline:"5%", marginBlock:35 }}>
        <div className="card-header">
          <h4 className="card-title">Nueva Pregunta</h4>
        </div>
        <div className="card-body">
          <form onSubmit={handlSubmit} className="form-horizontal">
            <fieldset>
              <div className="mb-3 row form-group">
                <div className="col-lg-1"></div>
                <label htmlFor="textArea" className="col-lg-2 control-label">
                  Formular pregunta:
                </label>
                <div className="col-lg-8">
                  <textarea
                    className="form-control"
                    rows={2}
                    name="question"
                    id="description"
                    defaultValue={""}
                    onChange={handlerInputChange}
                  />
                </div>
              </div>
              <div className="mb-3 row form-group">
                <div className="col-lg-1"></div>
                <label htmlFor="textArea" className="col-lg-2 control-label">
                  Respuesta correcta:
                </label>
                <div className="col-lg-8">
                  <textarea
                    className="form-control"
                    rows={2}
                    name="correctAnswer"
                    id="description"
                    defaultValue={""}
                    onChange={handlerInputChange}
                  />
                </div>
              </div>
              <div className="mb-3 row form-group">
                <div className="col-lg-1"></div>
                <label htmlFor="textArea" className="col-lg-2 control-label">
                  Respuesta erronea:
                </label>
                <div className="col-lg-8">
                  <textarea
                    className="form-control"
                    rows={2}
                    name="inCorrectAnswer1"
                    defaultValue={""}
                    onChange={handlerInputChange}
                  />
                </div>
              </div>
              <div className="mb-3 row form-group">
                <div className="col-lg-1"></div>
                <label htmlFor="textArea" className="col-lg-2 control-label">
                  Respuesta erronea:
                </label>
                <div className="col-lg-8">
                  <textarea
                    className="form-control"
                    rows={2}
                    name="inCorrectAnswer2"
                    defaultValue={""}
                    onChange={handlerInputChange}
                  />
                </div>
              </div>
              <div className="mb-3 row form-group">
                <div className="col-lg-1"></div>
                <label htmlFor="textArea" className="col-lg-2 control-label">
                  Respuesta erronea:
                </label>
                <div className="col-lg-8">
                  <textarea
                    className="form-control"
                    rows={2}
                    name="inCorrectAnswer3"
                    defaultValue={""}
                    onChange={handlerInputChange}
                  />
                </div>
              </div>
              <div className="mb-3 row form-group">
                <div className="col-lg-1"></div>
                <label className="col-lg-2 control-label">Multimedia:</label>
                <div className="col-lg-8">
                  <input
                    type="text"
                    name="multimedia"
                    className="form-control"
                    placeholder="Foto"
                    defaultValue={""}
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
    )
}

export default QuestionForm
