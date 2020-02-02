import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";

import "./styles.css";
import inventory from "./inventory.ES6";
import ComposeSaladModal from "./ComposeSaladModal";

function App() {
    return (
        <div>
            <div className="jumbotron text-center">
                <h1 className="display-4">Brunt & Bajs</h1>
                <p className="lead">Lunds äckligaste sallad</p>
                <hr className="my-4" />
                <p>Gör din rövsallad här!</p>
                <button
                    type="button"
                    className="btn btn-primary"
                    data-toggle="modal"
                    data-target="#ComposeSaladModal"
                >
                    Komponera din egen sallad
        </button>
            </div>
            <ComposeSaladModal inventory={inventory} />
        </div>
    );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
