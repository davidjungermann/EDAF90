import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'mdbreact/dist/css/mdb.css'

import OrderView from "./OrderView";
import ComposeSalad from './ComposeSalad';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Salad from './Salad';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { order: [], inventory: {} };
    this.saladSubmit = this.saladSubmit.bind(this);
    this.saladRemove = this.saladRemove.bind(this);
    this.postSalad = this.postSalad.bind(this);
  }

  postSalad() {
    fetch("http://localhost:8080/orders/", {
      crossDomain: true,
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(this.state.order)
    })
      .then(response => response.json())
      .then(data => alert(JSON.stringify(data)));

    this.setState({ order: [] });
    window.localStorage.clear();
  }

  fetchInventory() {
    let tempInventory = {};
    let params = ["foundations", "proteins", "extras", "dressings"];
    let url = 'http://localhost:8080/';

    Promise.all(
      params.map(async param => {
        const response = await fetch(url + param, {
          method: "GET",
          mode: "cors",
          cache: "default"
        });

        const response_1 = await response.json();
        Promise.all(response_1.map(async ingredient => {
          const response_2 = await fetch((url + param + '/' + ingredient), {
            method: "GET",
            mode: "cors",
            cache: "default"
          });
          const response_3 = await response_2.json();
          tempInventory = { ...tempInventory, [ingredient]: response_3 };
        })).then(() => {
          this.setState({ inventory: tempInventory });
        });
      })
    );
  }

  componentDidMount() {
    let order = JSON.parse(window.localStorage.getItem('salads'));
    if (order != null) {
      order.forEach(s => Object.setPrototypeOf(s, Salad.prototype));
      this.setState({ order: order });
    }
    this.fetchInventory();
  }

  saladSubmit(s) {
    let temp = [...this.state.order]
    temp.push(s);
    this.setState({ order: temp })
    window.localStorage.setItem('salads', JSON.stringify(temp));
  }

  saladRemove(s) {
    let temp = [...this.state.order];
    let index = temp.indexOf(s);
    temp.splice(index, 1);
    this.setState({ order: temp });
    window.localStorage.setItem('salads', JSON.stringify(temp));
  }

  render() {
    const compose = (params) => <ComposeSalad {...params} inventory={this.state.inventory} saladSubmit={this.saladSubmit} />;
    const order = (params) => <OrderView {...params} inputSalad={this.state.order} saladRemove={this.handleSaladRemove} postSalad={this.postSalad} />;

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
          <Route path="/order-view" render={order}></Route>
        </div>
        <div>
          <Route path="/ingredient-view/:ingredient" ></Route>
        </div>
      </Router>
    );
  }
}

export default App;
