import React from 'react';
import './App.css';
//import inventory from './inventory.ES6';
import ComposeSalad from "./ComposeSalad";
import OrderView from "./OrderView";
import { BrowserRouter as Router, Route, Link, useParams } from "react-router-dom";


class App extends React.Component {
  constructor(props) {
    super(props);
    this.saladSubmit = this.saladSubmit.bind(this);
    this.saladRemove = this.saladRemove.bind(this);
    this.state = {
      order: [],
      inventory: {}
    };
  }

  fetchInventory() {
    let url = 'http://localhost:8080/';
    let params = ['foundations', 'proteins', 'extras', 'dressings'];
    let tempInventory = {};

    Promise.all(params.map(async param => { // Tar en array med alla query params
      const response = await fetch(url + param); // Inväntar response för alla params. 
      const data = await response.json(); // Inväntar alla svar och gör till JSON. 
      Promise.all(data.map(async (ingredient) => { // Tar en ny array med alla svar
        const response_1 = await fetch(url + param + '/' + ingredient); // Gör samma sak som ovan fast tar alla ingredienser för en given param, t.ex. alla ingr i foundation. 
        const obj = await response_1.json(); // Inväntar svar
        return tempInventory[ingredient] = obj; // Lägger till i ett tempobjekt med ingrediensnamn som nyckel
      }));
    }))
      .then(this.setState({ inventory: tempInventory })); // När alla ingredienser för alla parametrar är hämtade sätter vi inventory i state till tempInventory. 
  }

  componentDidMount() {
    this.fetchInventory();
  }


  async order(salad) {
    let url = 'http://localhost:8080/orders/'
    const response = await fetch(url, {
      method: "POST",
      headers: {'Accept': 'application/json'},
      body: JSON.stringify(salad),
    });
    return await response.json();
  }

  saladSubmit(salad) {
    let tempSalads = [...this.state.order];
    tempSalads.push(salad)
    this.setState({ order: tempSalads })
    this.order(salad)
      .then(data => alert(JSON.stringify(data)));
  }

  saladRemove(salad) {
    let tempSalads = [...this.state.order];
    tempSalads.splice(tempSalads.indexOf(salad), 1);
    this.setState({ order: tempSalads })
  }

  composeSaladElem() {
    return (params) => <ComposeSalad {...params} inventory={this.state.inventory}
      saladSubmit={this.saladSubmit} test={this.fetchInventory} />;
  }

  composeOrderElem() {
    return (params) => <OrderView {...params} orderList={this.state.order} saladRemove={this.saladRemove} />;
  }

  render() {
    const compose = this.composeSaladElem();
    const orders = this.composeOrderElem();

    return (
      <Router>
        <div className="jumbotron text-center" style={{ "marginTop": "-50px" }}>
          <h1 className="display-4">🌱 PLANTS 🌱</h1>
          <p className="lead">Lunds äckligaste sallad</p>
          <ul className="nav nav-pills" style={{ "marginBottom": "-60px" }}>
            <li>
              <Link className="nav-link" to="/compose-salad" style={{ "color": "green" }}>Komponera din sallad</Link>
            </li>
            <li>
              <Link className="nav-link" to="/order-view" style={{ "color": "green" }}>Beställning</Link>
            </li>
          </ul>
        </div>
        <div className="container w-25">
          <Route path="/compose-salad" render={compose}></Route>
        </div>
        <div>
          <Route path="/order-view" render={orders}></Route>
        </div>
        <div>
          <Route path="/ingredient-view/:ingredient" ></Route>
        </div>
      </Router>
    );
  }
}
export default App;
