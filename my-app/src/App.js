import logo from "./logo.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import "./scss/inner-generic.scss";
import Home from "./pages/home";
import Whisky from "./pages/whisky";

import {
  BrowserRouter,
  Route,
  Link,
  match,
  Switch,
  Redirect,
} from "react-router-dom";

function App() {
  return (
    <div className="inner-container">
      <div className="container">
        <BrowserRouter>
          <div className="App">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/whisky/:id" component={Whisky} />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
