import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import'bootswatch/dist/flatly/bootstrap.css';
import "react-toastify/dist/ReactToastify.css";
import firebaseConfig from "./firebase";
import reportWebVitals from "./reportWebVitals";
import { FirebaseAppProvider } from "reactfire";
import PublicRouter from "./Router/PublicRouter";
import PrivateRouter from "./Router/PrivateRouter";
import {ContextSidebarProvider}from "./context/ContextSidebar";
import "./utils/UserJson"

ReactDOM.render(
  <>
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <Suspense fallback={<p>Cargando...</p>}>
        <BrowserRouter>
        {!window.localStorage.getItem("loggedUser") ? (
        <PublicRouter/>
      ) : (
        <>
        <ContextSidebarProvider>
          <PrivateRouter/>
        </ContextSidebarProvider>
        </>
      )}
          <ToastContainer />
        </BrowserRouter>
      </Suspense>
    </FirebaseAppProvider>
  </>,
  document.getElementById("root")
);

reportWebVitals();
