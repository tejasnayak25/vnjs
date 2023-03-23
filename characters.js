const { Character } = require("./vnjs_modules/base_module");
const storage = require("./vnjs_modules/storage").storage;

class Codel extends Character {
    constructor(config) {
        super(config);
    }
}

exports.Maya = new Codel({name:'Maya', folder:'Maya'});