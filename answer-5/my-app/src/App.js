import './App.css';
import { Register } from "./components/register";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <Register />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
