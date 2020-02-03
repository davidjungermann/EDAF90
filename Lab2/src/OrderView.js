import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css'
import React from "react";

const shortid = require('shortid');


class OrderView extends React.Component {

    render() {
        return (
            <ul className="container w-50 list-group">
                {this.props.orderList.map(salad =>
                    <li key={shortid.generate()} className="list-group-item list-group-item-success" style={{
                        marginTop: 10
                    }}>
                        <span style={{
                            display: "block",
                            width: 500
                        }}>{salad.print(salad)}
                        </span>
                        <div className="col text-center" style={{height: "50%"}}>
                            <span className="badge badge-primary badge-pill float-right">{salad.price() + " kr"}</span>
                            <button type='button' className="btn btn-danger float-right" onClick={() => this.props.saladRemove(salad)}>Ta bort</button>
                        </div>
                    </li>)
                }
            </ul>

        );
    }
}

export default OrderView;