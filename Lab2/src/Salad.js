export default class Salad { 
    constructor() {
        this.foundation = [];
        this.protein = [];
        this.extras = [];
        this.dressing = [];
    }

    add(ingrType, ingredient) {

        if (ingrType === 'foundation') {
            this.foundation.push(ingredient);
        } else if (ingrType === 'protein') {
            this.protein.push(ingredient);
        } else if (ingrType === 'extra') {
            this.extras.push(ingredient);
        } else if (ingrType === 'dressing') {
            this.dressing.push(ingredient);
        } else {
            console.warn("Provided ingredient type does not exist.")
        }
    }

    remove(ingrType, ingredient) {

        if (ingrType === 'foundation') {
            this.foundation.splice(this.foundation.indexOf(ingredient, 1));
        } else if (ingrType === 'protein') {
            this.protein.splice(this.protein.indexOf(ingredient, 1));
        } else if (ingrType === 'extra') {
            this.extras.splice(this.extras.indexOf(ingredient, 1));
        } else if (ingrType === 'dressing') {
            this.dressing.splice(this.dressing.indexOf(ingredient, 1));
        } else {
            console.warn("Provided ingredient type does not exist.")
        }
    }

    price() {
        let salad = [].concat(this.foundation, this.protein, this.extras, this.dressing);
        return salad.reduce((sum, ingredient) => sum += ingredient.price, 0);
    }
}