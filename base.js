const { Maya } = require("./characters");
const { map, next, char, dialog, clrscr, music, getInput, input, choice, sfx } = require("./vnjs_modules/modules");
const { Cafe } = require("./scenes");
const storage = require("./vnjs_modules/storage").storage;

var scene1 = () => {
    map(Cafe);
    music(null);
    let ch = char("right", Maya.mood('introduce.png'), 2, 2);
    ch.walks(12, -1, 0.5);
    dialog(Maya, "Hello there!");
    dialog(Maya, "Welcome to VNJS!");
    next(scene2);
}

var scene2 = () => {
    map(Cafe);
    // music('action.mp3');
    let ch = char("right", Maya.mood('smile.png'), 2, 2);
    ch.walks(12, -1, 0.5);
    dialog(Maya, "I am Maya, here to guide you through this example game.");
    // dialog(Maya, "How are you?");
    var input1 = {name: 'name', type: 'text', placeholder: 'Enter your name', message: "Hello there! What's your name?"};
    dialog(Maya, "Before we start!", ()=>{
        let val = input('name', 'text', 'Enter Your Name', "What's your name?");
        val.select();
        val.onkeydown =(e) => {
            if(e.key === "Enter") {
                dialog(Maya, val.value + ", that's a cool name.");
                storage.insert({player: val.value});
                dialog(Maya, "I'm glad you're here!");
            }
        }
    });
    next(scene3);
}

var scene3 = () => {
    map(Cafe);
    let ch = char("right", Maya.mood('smile.png'), 2, 2);
    ch.walks(12, 1, 0.5);
    dialog(Maya, "{player}, now that you have seen this example game, don't you think this framework is cool?", async ()=>{
        let output = await choice(['This is awesome', 'Can be improved', "This isn't cool at all"]);
        output.addEventListener("choice", (e) => {
            ch.walks(24, -1, 0.5);
            if(e.detail.result === "This is awesome") {
                // sfx("notifications.mp3");
                dialog(Maya, "Thank you so much! I'm glad you liked it");
            } else if (e.detail.result === "Can be improved") {
                dialog(Maya, "We're all ears! Let us know how this framework can be improved through our github repo.");
            } else if (e.detail.result === "This isn't cool at all") {
                dialog(Maya, "Could we have done something better? Any suggestions? Kindly, let us know on our github repo.");
            }
        });
    });
    next(scene4);
}

var scene4 = async () => {
    map(Cafe);
    music(null);
    let ch = char("center", Maya.mood('bye.png'), 2, 2);
    dialog(Maya, "Thanks for tagging along!");
    dialog(Maya, "For any inquiries, post an issue on our Github repo!", () => {
        dialog(Maya, "Bye!");
    });
    next("credits");
}


if(storage.find("menu_selection") === "new-game") {
    exports.start = scene1;
} else if(storage.find("menu_selection") === "continue") {
    if(storage.find("continue")) {
        exports.start = eval(storage.find("continue"));
    } else {
        exports.start = scene1;
    }
}