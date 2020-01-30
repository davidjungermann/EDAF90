import React from "react";
class ComposeSalad extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            foundation: [],
            protein: [],
            extras: [],
            dressing: [],
            price: 0
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ foundation: event.target.value });
    }

    handleSubmit(event) {
        alert('Basen är: ' + this.state.foundation);
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
        return (
            <div className="container" onSubmit={this.handleSubmit}>
                <form>
                    <label>
                        Välj bas: &nbsp;
                        <select value={this.state.foundation} onChange={this.handleChange}>
                            <option value="" selected disabled hidden>Välj salladsbas</option>
                            {foundations.map(ingredient => <option key={ingredient} value={ingredient}>
                                {ingredient}</option>)}
                        </select>
                    </label>
                    <br></br>
                    <label>
                        Välj protein: &nbsp;
                            <input
                            name="protein"
                            type="checkbox"
                            checked={this.state.isGoing}
                            onChange={this.handleInputChange} />
                    </label>
                    <br></br>
                    <label>
                        Välj extras: &nbsp;
                            <input
                            name="extras"
                            type="checkbox"
                            checked={this.state.isGoing}
                            onChange={this.handleInputChange} />
                    </label>
                    <br></br>
                    <label>
                        Välj dressing: &nbsp;
                            <input
                            name="dressing"
                            type="checkbox"
                            checked={this.state.isGoing}
                            onChange={this.handleInputChange} />
                    </label>
                    <br></br>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        );
    }
}

export default ComposeSalad;
