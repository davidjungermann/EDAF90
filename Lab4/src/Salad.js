import nextId from "react-id-generator";
import inventory from "./inventory.ES6"
export default class Salad {
    constructor() {
        this.ingredients = {
            foundation: [],
            protein: [],
            extra: [],
            dressing: []
        }
        Object.defineProperty(this, "id", { value: nextId(), writable: false });
    }

    addFoundation(ingredient) {
        this.ingredients.foundation.push(ingredient);
    }
    addProtein(ingredient) {
        this.ingredients.protein.push(ingredient);
    }
    addExtra(ingredient) {
        this.ingredients.extra.push(ingredient);
    }
    addDressing(ingredient) {
        this.ingredients.dressing.push(ingredient);
    }


    remove(ingredient) {
        if (ingredient.foundation) {
            this.ingredients.foundation = [];
        }
        if (ingredient.protein) {
            this.ingredients.protein = [];
        }
        if (ingredient.extra) {
            this.ingredients.extra = [];
        }
        if (ingredient.dressing) {
            this.ingredients.dressing = [];
        }
    }

    price() {
        let allIngredientPrices = Object.values(this.ingredients).reduce((acc, curr) => {
            return acc.concat(curr);
        }, []);
        let totalPrice = allIngredientPrices.reduce((acc, curr) => {
            return acc + curr.price;
        }, 0);
        console.log("Total price: " + totalPrice);
    }
    
    print() {
        return (
            " Bas: " +
            this.ingredients.foundation +
            " Protein: " +
            this.ingredients.protein +
            " Extra: " +
            this.ingredients.extra +
            " Dressing: " +
            this.ingredients.dressing
            + " "
        );
    }

}
