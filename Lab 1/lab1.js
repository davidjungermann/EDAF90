'use strict';
const imported = require("./inventory.js");
let keys = Object.keys(imported.inventory).map(
    function (key) {
        return imported.inventory[key];

    }
);
//console.log(keys);