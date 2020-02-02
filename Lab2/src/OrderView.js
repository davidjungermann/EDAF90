import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css'
import React from "react";
const shortid = require('shortid');

class OrderView extends React.Component {

    render() {
        return (
            <ul className="container w-50" id="salads">
                {this.props.orderList.map(salad =>
                    <li key={shortid.generate()} className='list-group-item'>
                        {"Bas: " + salad.foundation + " Protein: " + salad.protein + " Extra: " + salad.extra + " Dressing: " + salad.dressing}
                        <button type='button' className="btn btn-danger" onClick={() => this.props.saladRemove(salad)}>Ta bort</button>
                        <span class="badge badge-primary badge-pill">{salad.price()}</span>
                    </li>)}
            </ul>

        );
    }
}

export default OrderView;