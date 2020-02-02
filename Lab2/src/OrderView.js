import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css'
import React from "react";

const shortid = require('shortid');


class OrderView extends React.Component {

    render() {
        return (
            <ul className="container">
                {this.props.orderList.map(salad =>
                    <li key={shortid.generate()} className='list-group-item fixed'>
                        {salad.print(salad)}
                        <button type='button' className="btn btn-danger right-button" onClick={() => this.props.saladRemove(salad)}>Ta bort</button>
                        <span className="badge badge-primary badge-pill pill" >{salad.price()}</span>
                    </li>)
                }
            </ul>

        );
    }
}

export default OrderView;