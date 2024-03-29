import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Containers/Home";
import Register from "./Containers/Register";
import Login from "./Containers/Login";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { isuserLoggedIn } from "./Action/userActions";
import ErrorPage from "./Containers/ErrorPage";
import PrivateRoutes from "./privateRoutes";
import PostDonor from "./Containers/PostDonor";
import PatientDonor from "./Containers/PatientDonor";
import PatientList from "./Containers/PatientList";
import DonorList from "./Containers/DonorList";

function App() {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isuserLoggedIn());
    }
  }, []);
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/requests" component={PatientList} />
          <Route exact path="/donors" component={DonorList} />
          <PrivateRoutes path="/postasdonor" component={PostDonor} />
          <PrivateRoutes path="/postaspatient" component={PatientDonor} />
          <Route component={ErrorPage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
