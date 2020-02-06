import React from 'react';
import './App.css';
import inventory from './inventory.ES6';
import ComposeSaladModal from "./ComposeSaladModal";
import OrderView from "./OrderView";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


class App extends React.Component {
  constructor(props) {
    super(props);
    this.saladSubmit = this.saladSubmit.bind(this);
    this.saladRemove = this.saladRemove.bind(this);
    this.state = {
      order: []
    };
  }

  saladSubmit(salad) {
    let tempSalads = [...this.state.order];
    tempSalads.push(salad)
    this.setState({ order: tempSalads })
  }

  saladRemove(salad) {
    let tempSalads = [...this.state.order];
    tempSalads.splice(tempSalads.indexOf(salad), 1);
    this.setState({ order: tempSalads })
  }

  render() {
    return (
      <div>
        <div className="jumbotron text-center">
          <h1 className="display-4">🌱 PLANTS 🌱</h1>
          <p className="lead">Lunds äckligaste sallad</p>
        </div>
        <Router>
          <ul className="nav nav-pills">
            <li>
              <Link className="nav-link" to="./ComposeSalad">Komponera din sallad</Link>
            </li>
            <li>
              <Link className="nav-link" to="./OrderView">Beställning</Link>
            </li>
          </ul>
        </Router>
      </div>
    );
  }
}
export default App;
