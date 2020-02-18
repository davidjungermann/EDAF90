import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import "bootstrap/dist/js/bootstrap.js";
import 'mdbreact/dist/css/mdb.css'

import OrderView from "./OrderView";
import ComposeSalad from './ComposeSalad';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Salad from './Salad';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { list: [], inventory: {} };
    this.handleSaladSubmit = this.handleSaladSubmit.bind(this);
    this.handleSaladRemove = this.handleSaladRemove.bind(this);
    this.sendToServer = this.sendToServer.bind(this);
  }

  sendToServer() {
    fetch("http://localhost:8080/orders/", {
      crossDomain: true,
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(this.state.list)
    })
      .then(response => response.json())
      .then(data => console.log(JSON.stringify(data)));

    this.setState({ list: [] });
    window.localStorage.clear();
  }

  componentDidMount() {
    let list = JSON.parse(window.localStorage.getItem('orders'));
    if (list != null) {
      list.forEach(s => Object.setPrototypeOf(s, Salad.prototype));
      this.setState({ list: list });
    }
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

  handleSaladSubmit(s) {
    let temp = [...this.state.list]
    temp.push(s);
    this.setState({ list: temp })
    window.localStorage.setItem('orders', JSON.stringify(temp));
  }

  handleSaladRemove(s) {
    let temp = [...this.state.list];
    let index = temp.indexOf(s);
    temp.splice(index, 1);
    this.setState({ list: temp });
    window.localStorage.setItem('orders', JSON.stringify(temp));
  }

  render() {
    const composeSaladElem = (params) => <ComposeSalad {...params} inventory={this.state.inventory} handleSaladSubmit={this.handleSaladSubmit} />;
    const viewOrderElem = (params) => <OrderView {...params} inputSalad={this.state.list} handleSaladRemove={this.handleSaladRemove} submitOrder={this.sendToServer} />;

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
          <Route path="/compose-salad" render={composeSaladElem}></Route>
        </div>
        <div>
          <Route path="/order-view" render={viewOrderElem}></Route>
        </div>
        <div>
          <Route path="/ingredient-view/:ingredient" ></Route>
        </div>
      </Router>
    );
  }
}

export default App;
