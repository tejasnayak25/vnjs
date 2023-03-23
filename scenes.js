let { Scene } = require("./vnjs_modules/base_module");

class Cafe extends Scene {
    constructor(config) {
        super(config);
        this.background = "cafe.jpg";
    }
}

exports.Cafe = Cafe;