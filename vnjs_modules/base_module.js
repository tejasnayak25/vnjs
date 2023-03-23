class Scene {
    constructor(config) {
        // this.sceneNo = config.sceneNo;
    }

    init() {
        document.getElementById("background").querySelector("img").src = "./backgrounds/" + this.background;
    }
}

class Character {
    constructor(config) {
        this.name = config.name;
        this.folder = config.folder;
    }
    mood(mood) {
        return './characters/'+this.folder+'/'+this.folder+'-'+mood;
    }
}

exports.Scene = Scene;
exports.Character = Character;