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

console.log(ingrType.foundation + "\n" + ingrType.extra + "\n" + ingrType.protein + "\n" + ingrType.dressing);


// Task 5
class Salad {
    // Map?  
    constructor() {
        this.foundation = [];
        this.protein = [];
        this.extras = [];
        this.dressing = [];
    }

    add(ingrType, ingredient) {

        if (ingrType == 'foundation') {
            this.foundation.push(ingredient);
        } else if (ingrType == 'protein') {
            this.protein.push(ingredient);
        } else if (ingrType == 'extras') {
            this.extras.push(ingredient);
        } else if (ingrType == 'dressing') {
            this.dressing.push(ingredient);
        } else {
            console.warn("Provided ingredient type does not exist.")
        }
    }

    remove(ingrType, ingredient) {
        if (ingrType == 'foundation') {
            this.foundation.splice(this.foundation.indexOf(ingredient, 1));
        } else if (ingrType == 'protein') {
            this.protein.splice(this.protein.indexOf(ingredient, 1));
        } else if (ingrType == 'extras') {
            this.extras.splice(this.extras.indexOf(ingredient, 1));
        } else if (ingrType == 'dressing') {
            this.dressing.splice(this.dressing.indexOf(ingredient, 1));
        } else {
            console.warn("Provided ingredient type does not exist.")
        }
    }
}

// Task 6

let myCaesarSalad = new Salad();
myCaesarSalad.add('foundation', 'Sallad');
myCaesarSalad.add('protein', 'Kycklingfilé');
myCaesarSalad.add('extras', 'Bacon');
myCaesarSalad.add('extras', 'Krutonger');
myCaesarSalad.add('extras', 'Körsbärstomater');
myCaesarSalad.add('extras', 'Parmesan');
myCaesarSalad.add('dressing', 'Caesardressing');
myCaesarSalad.add('extras', 'Banan');
myCaesarSalad.remove('extras', 'Banan');
console.log(myCaesarSalad)