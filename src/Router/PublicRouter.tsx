import {Switch, Route, Redirect } from "react-router-dom";
import RememberPassword from "../Components/Auth/RememberPassword";
import Auth from "../Components/Auth/Auth";

function PublicRouter() {
    return (
        <>
        <Switch>
          <Route exact path="/" component={Auth} />
          <Route
            exact
            path="/RememberPassword"
            component={RememberPassword}
          />
          <Redirect from="/**" to="/" />
        </Switch>
      </>
    )
}

export default PublicRouter
