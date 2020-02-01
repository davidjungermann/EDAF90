import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css'
import React from "react";
import Salad from "./Salad";

class ComposeSalad extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            foundation: [],
            protein: [],
            extra: [],
            dressing: [],
            salad: new Salad()
        };
        this.handleFoundation = this.handleFoundation.bind(this);
        this.handleProtein = this.handleProtein.bind(this);
        this.handleExtra = this.handleExtra.bind(this);
        this.handleDressing = this.handleDressing.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleFoundation(event) {
        this.setState({ foundation: event.target.value });
    }

    handleProtein(event) {
        let proteins = [...this.state.protein]

        if (event.target.checked) {
            proteins.push(event.target.value)
        } else {
            this.proteins.splice(this.proteins.indexOf(event.target.value, 1));
        }
        this.setState({ protein: proteins })
    }

    handleExtra(event) {
        let extras = [...this.state.extra]

        if (event.target.checked) {
            extras.push(event.target.value)
        } else {
            this.extras.splice(this.extras.indexOf(event.target.value, 1));
        }
        this.setState({ extra: extras })
    }

    handleDressing(event) {
        this.setState({ dressing: event.target.value });
    }

    createSalad() {
        console.log(this.state.foundation)
        console.log(this.state.protein)
        console.log(this.state.extra)
        console.log(this.state.dressing)
    }

    clearState() {
        this.setState({
            foundation: [],
            protein: [],
            extra: [],
            dressing: [],
            salad: new Salad()
        })
    }

    handleSubmit(event) {
        this.createSalad();
        //this.clearState();
        event.preventDefault();
    }

    render() {
        const inventory = this.props.inventory;

        if (!inventory) {
            alert("inventory is undefined in ComposeSalad");
        }

        let foundations = Object.keys(inventory).filter(
            name => inventory[name].foundation
        );

        let proteins = Object.keys(inventory).filter(
            name => inventory[name].protein
        );

        let extras = Object.keys(inventory).filter(
            name => inventory[name].extra
        );

        let dressings = Object.keys(inventory).filter(
            name => inventory[name].dressing
        );

        return (
            <div className="container" onSubmit={this.handleSubmit}>
                <form>
                    <h4>Bas:</h4>
                    <select class="browser-default custom-select" value={this.state.foundation} onChange={this.handleFoundation}>
                        <option value="" selected disabled hidden>Välj salladsbas</option>
                        {foundations.map(ingredient => <option key={ingredient} value={ingredient}>
                            {ingredient + ' (' + inventory[ingredient].price + 'kr' + ')'}</option>)}
                    </select>
                    <p></p>

                    <h4>Protein:</h4>

                    {proteins.map(ingredient => (
                        <div key={ingredient}>
                            <input
                                type="checkbox"
                                name="protein"
                                value={ingredient}
                                checked={this.setState()}
                                onChange={this.handleProtein}
                            />
                            {" " + ingredient + " +" + inventory[ingredient].price + " kr"}</div>
                    ))}
                    <p></p>

                    <h4>Extraingredienser:</h4>
                    {extras.map(ingredient => (
                        <div key={ingredient}>
                            <input
                                type="checkbox"
                                name="extras"
                                value={ingredient}
                                checked={this.setState()}
                                onChange={this.handleExtra}
                            />
                            {" " + ingredient + " +" + inventory[ingredient].price + " kr"}</div>
                    ))}
                    <p></p>

                    <h4>Dressing:</h4>
                    <select class="browser-default custom-select" value={this.state.dressings} onChange={this.handleDressing}>
                        <option value="" selected disabled hidden>Välj salladsdressing</option>
                        {dressings.map(ingredient => <option key={ingredient} value={ingredient}>
                            {ingredient + ' (' + inventory[ingredient].price + 'kr' + ')'}</option>)}
                    </select>
                    <p></p>
                    <button
                        type="submit"
                        className="btn btn-primary"
                        data-target="./ComposeSalad">
                        Lägg till sallad
                    </button>
                </form>
            </div>
        );
    }
}

export default ComposeSalad;
