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
        <div className="jumbotron text-center" style={{"margin-top":"-50px"}}>
          <h1 className="display-4">🌱 PLANTS 🌱</h1>
          <p className="lead">Lunds äckligaste sallad</p>
          <Router>
          <ul className="nav nav-pills" style={{"margin-bottom":"-60px"}}>
            <li>
              <Link className="nav-link" to="./ComposeSalad" style={{"color":"green"}}>Komponera din sallad</Link>
            </li>
            <li>
              <Link className="nav-link" to="./OrderView" style={{"color":"green"}}>Beställning</Link>
            </li>
          </ul>
        </Router>
        </div>
    );
  }
}
export default App;
