'use strict';
const imported = require("./inventory.js");

// Task 4
var ingrType = {
    foundation: 'Foundations: ',
    extra: 'Extras: ',
    protein: 'Proteins: ',
    dressing: 'Dressings: '
}

let ingredients = imported.inventory;

Object.keys(ingredients).forEach(ingredient => {
    if (ingredients[ingredient].hasOwnProperty('foundation')) {
        ingrType.foundation += ingredient + ','
    } else if (ingredients[ingredient].hasOwnProperty('extra')) {
        ingrType.extra += ingredient + ','
    } else if (ingredients[ingredient].hasOwnProperty('protein')) {
        ingrType.protein += ingredient + ','
    } else if (ingredients[ingredient].hasOwnProperty('dressing')) {
        ingrType.dressing += ingredient + ','
    }
});

//console.log(ingrType.foundation + "\n" + ingrType.extra + "\n" + ingrType.protein + "\n" + ingrType.dressing);

class Salad {
    constructor() {
        this.foundation = [];
        this.protein = [];
        this.extras = [];
        this.dressing = [];
    }

    add(ingredient) {

        if (ingredient.hasOwnProperty('foundation')) {
            this.foundation.push({
                ingredient: ingredient,
                ...ingredients[ingredient]
            });
        } else if (ingredient.hasOwnProperty('protein')) {
            this.protein.push({
                ingredient: ingredient,
                ...ingredients[ingredient]
            });
        } else if (ingredient.hasOwnProperty('extras')) {
            this.extras.push({
                ingredient: ingredient,
                ...ingredients[ingredient]
            });
        } else if (ingredient.hasOwnProperty('dressing')) {
            this.dressing.push({
                ingredient: ingredient,
                ...ingredients[ingredient]
            });
        } else {
            console.warn("Provided ingredient type does not exist.")
        }
    }

    remove(ingredient) {

        if (ingredient.hasOwnProperty('foundation')) {
            this.foundation.splice(this.foundation.indexOf(ingredient, 1));
        } else if (ingredient.hasOwnProperty('protein')) {
            this.protein.splice(this.protein.indexOf(ingredient, 1));
        } else if (ingredient.hasOwnProperty('extras')) {
            this.extras.splice(this.extras.indexOf(ingredient, 1));
        } else if (ingredient.hasOwnProperty('foundation')) {
            this.dressing.splice(this.dressing.indexOf(ingredient, 1));
        } else {
            console.warn("Provided ingredient type does not exist.")
        }
    }
    // Task 7
    price() {
        var salad = [].concat(this.foundation, this.protein, this.extras, this.dressing);
        return salad.reduce((sum, ingredient) => sum += ingredients[ingredient].price, 0);
    }
}

class ExtraGreenSalad extends Salad {

    price() {
        var salad = [].concat(this.foundation, this.protein, this.extras, this.dressing);
        return salad.reduce((sum, ingredient) => {
            if ("foundation" in ingredients[ingredient])
                return sum += ingredients[ingredient].price * 1.3
            return sum += ingredients[ingredient].price * 0.5
        }, 0);
    }
}

// myCaesarSalad{}: Salad => Prototype{add: [Function], remove: [Function], price: [Function]} =>  myGreenSalad{}: ExtraGreenSalad => Prototype{price: [Function]} => Object {} => null 


class GourmetSalad extends Salad {  
    add(ingredient, scaling = 1) {

        if (ingredient.hasOwnProperty('foundation')) {
            this.foundation.push({
                ingredient: ingredient,
                scaling: scaling,
                ...ingredients[ingredient]
            });
        } else if (ingredient.hasOwnProperty('protein')) {
            this.protein.push({
                ingredient: ingredient,
                scaling: scaling,
                ...ingredients[ingredient]
            });
        } else if (ingredient.hasOwnProperty('extras')) {
            this.extras.push({
                ingredient: ingredient,
                scaling: scaling,
                ...ingredients[ingredient]
            });
        } else if (ingredient.hasOwnProperty('dressing')) {
            this.dressing.push({
                ingredient: ingredient,
                scaling: scaling,
                ...ingredients[ingredient]
            });
        } else {
            console.warn("Provided ingredient type does not exist.")
        }
    }
    price() {
        var salad = [].concat(this.foundation, this.protein, this.extras, this.dressing);
        return salad.reduce((sum, ingredient) => sum += ingredients[ingredient.ingredient].price * ingredient.scaling, 0);
    }
}

let mySalad = new Salad();
mySalad.add(ingredients.Sallad)
mySalad.add(ingredients.Bacon)
// ----------------------------------------------------------------------------------- // 

class ShoppingBasket {
    constructor() {
        this.salads = [];
    }

    add(salad) {
        this.salads.push(salad);
    }

    remove(salad) {
        let index = this.salads.indexOf(salad);
        this.salads.splice(index, 1);
    }

    price() {
        let sum = 0;
        this.salads.forEach(salad => sum += salad.price());
        return sum;
    }
}
