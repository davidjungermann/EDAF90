class Salad {
    constructor() {
        this.foundation = [];
        this.protein = [];
        this.extras = [];
        this.dressing = [];
    }

    add(name, ingredient) {

        if (ingredient.hasOwnProperty('foundation')) {
            this.foundation.push(ingredient);
        } else if (ingredient.hasOwnProperty('protein')) {
            this.protein.push(ingredient);
        } else if (ingredient.hasOwnProperty('extra')) {
            this.extras.push(ingredient);
        } else if (ingredient.hasOwnProperty('dressing')) {
            this.dressing.push(ingredient);
        } else {
            console.warn("Provided ingredient type does not exist.")
        }
    }

    remove(ingredient) {

        if (ingredient.hasOwnProperty('foundation')) {
            this.foundation.splice(this.foundation.indexOf(ingredient, 1));
        } else if (ingredient.hasOwnProperty('protein')) {
            this.protein.splice(this.protein.indexOf(ingredient, 1));
        } else if (ingredient.hasOwnProperty('extra')) {
            this.extras.splice(this.extras.indexOf(ingredient, 1));
        } else if (ingredient.hasOwnProperty('dressing')) {
            this.dressing.splice(this.dressing.indexOf(ingredient, 1));
        } else {
            console.warn("Provided ingredient type does not exist.")
        }
    }
    // Task 7
    price() {
        let salad = [].concat(this.foundation, this.protein, this.extras, this.dressing);
        return salad.reduce((sum, ingredient) => sum += ingredient.price, 0);
    }
}