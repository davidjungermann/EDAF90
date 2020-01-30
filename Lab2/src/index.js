import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import $ from "jquery"; // skip this if you do not use bootstrap modals
import Popper from "popper.js"; // skip this if you do not use bootstrap modals

import "./styles.css";
import inventory from "./inventory.ES6";
import ComposeSalad from "./ComposeSalad";
import ComposeSaladModal from "./ComposeSaladModal";

function App() {
    return (
        <div>
            <div className="jumbotron text-center">
                <h1 className="display-4">Brunt & Bajs</h1>
                <p className="lead">Lunds äckligaste sallad</p>
                <hr className="my-4" />
                <p>Gör din rövsallad här!</p>
            </div>
            <ComposeSaladModal inventory={inventory} />
        </div>
    );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
