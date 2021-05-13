import { Switch, Route, Redirect } from "react-router-dom";
import Home from "../Components/Home/Home";
//import { ActivoForm } from "../Components/Activos/ActivoForm";
//import ActivoList from "../Components/Activos/ActivoList";
//import UserList from "../Components/Auth/UserList";
import SideBar from "../Components/Navigation/SideBar";
import Navbar from "../Components/Navigation/Navbar";
import verifyToken from "../utils/verifyToken"
//import UserView from "../Components/Home/UserView";
import Footer from "../Components/Navigation/Footer";
import ContextSidebar from "../context/ContextSidebar";
import React, { useContext } from "react";
import "./router.css";
import CategoriesList from "../Components/Categories/CategoriesList";
import CategoriesForm from "../Components/Categories/CategoriesForm";
import QuestionBank from "../Components/Auth/Questions/QuestionBank";
import QuestionForm from "../Components/Auth/Questions/QuestionForm";

function PrivateRouter() {
  const { position } = useContext<any>(ContextSidebar);

  verifyToken();

  return (
    <>
      <Navbar/>
      <SideBar />
      <div
        className={position ? "PrivateRouter" : "PrivateRouter active"}
        style={{ float: "right" }}
      >
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/categories" component={CategoriesList} />
          <Route exact path="/categoriesform" component={CategoriesForm} />
          <Route exact path="/questionbank/:id" component={QuestionBank} />
          <Route exact path="/questionform/:id" component={QuestionForm} />
          {/*<Route exact path="/activosform" component={ActivoForm} />
          <Route exact path="/activos" component={ActivoList} />
          <Route exact path="/userlist" component={UserList} />
          <Route exact path="/userview/:id" component={UserView} />*/}
          <Redirect from="/**" to="/" />
        </Switch>
      </div>
      <Footer />
    </>
  );
}

export default PrivateRouter;
