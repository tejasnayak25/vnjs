const { backArray } = require("./flow");
const { storage } = require("./storage");
let dialogArray= [];
let musicPlayer = document.createElement("audio");
musicPlayer.controls = false;
let inpValue;
let sfxPlayer = document.createElement("audio");
sfxPlayer.controls = false;

function next(scene) {
    document.onkeydown = (e) => {
        if(e.key === "ArrowRight") {
            if(scene === "credits") {
                window.open('./credits.html', "_self");
            } else {
                dialogArray = [];
                clrscr();
                exec(scene);
                initSay();
            }
        }
        if(e.key === "ArrowLeft") {
            dialogArray = [];
            console.log(backArray.pop());
            console.clear();
            clrscr();
            exec(backArray.pop());
            initSay();
        }
        if(e.key === "Enter") {
            if(dialogArray.length === 0) {
                if(scene === "credits") {
                    window.open('./credits.html', "_self");
                } else {
                    dialogArray = [];
                    clrscr();
                    exec(scene);
                }
            }
            initSay();
        }
        if(e.altKey) {
            e.preventDefault();
        }
        if(e.ctrlKey && e.shiftKey){
            switch(e.code){
        
                case 'KeyI':
                    e.preventDefault();
                    break;
        
            }
        }
    }
    document.onclick = () => {
        let event = new KeyboardEvent("keydown", {key:"Enter"});
        document.dispatchEvent(event);
    }
    document.ondblclick = (e) => {
        if(e.clientX < window.innerWidth*0.5) {
            let event = new KeyboardEvent("keydown", {key:"ArrowLeft"});
            document.dispatchEvent(event);
        } else {
            let event = new KeyboardEvent("keydown", {key:"ArrowRight"});
            document.dispatchEvent(event);
        }
    }
}

function map(name) {
    new name().init();
}

function char(pos, char, size, top = 0) {
    const charContainer = document.getElementById("char");

    const holder = document.createElement("img");
    holder.src = char;
    holder.classList.add("charHolder");
    holder.style.transform = "scale("+size+")";
    if(top !== 0) {
        holder.style.top = top + "em";
    }

    let newPos;

    if(pos === "left") {
        newPos = "left";
        holder.style.left = "10vw";
    } else if(pos === "right") {
        newPos = "right";
        holder.style.right = "0vw";
    } else if(pos === "center") {
        newPos = "left";
        holder.style.left = "25vw";
    }

    charContainer.appendChild(holder);

    function walks(dist, direction, time) {
        let speed = dist/time;
        let travel = 0;
        let rate = (10*speed)/1000;

        setInterval(() => {
            if(travel <= dist) {
                if(newPos === "left") {
                    if(direction === -1) {
                        holder.style.marginLeft = Number(holder.style.marginLeft.split("vw")[0]) - rate + "vw";
                        travel += rate;
                    } else if(direction === 1) {
                        holder.style.marginLeft = Number(holder.style.marginLeft.split("vw")[0]) + rate + "vw";
                        travel += rate;
                    }
                } else if(newPos === "right") {
                    if(direction === 1) {
                        holder.style.marginRight = Number(holder.style.marginRight.split("vw")[0]) - rate + "vw";
                        travel += rate;
                    } else if(direction === -1) {
                        holder.style.marginRight = Number(holder.style.marginRight.split("vw")[0]) + rate + "vw";
                        travel += rate;
                    }
                }
            }
        }, 10);
    }

    return {
        walks: walks
    }
}

function dialog(char, dialog, callback = null) {
    dialogArray.push({char, dialog, callback});
}

function initSay() {
    let req = dialogArray.reverse();
    say(req.pop());
}

async function say(dialog) {
    let host = document.getElementById("textbox");
    let namebox = document.getElementById("namebox");

    if(dialog.callback !== null) {
        // console.log(dialog.callback);
        dialog.callback();
    } else {
        clrInputs();
    }

    // if((dialog.dialog).includes('{inpValue}')) {
    //     dialog.dialog = dialog.dialog.replace('{inpValue}', inpValue);
    // }

    let cname = dialog.char.name;
    namebox.innerHTML = cname;
    let dialogue = dialog.dialog;
    if(dialog.dialog.includes("{player}")) {
        data(storage.find("player"));
        function data(hi) {
            dialogue = dialogue.replace("{player}", hi);
        }
    }
    host.querySelector("p").innerText = dialogue;

    namebox.style.display = "block";
    host.style.display = "block";

    return;
}

function clrscr() {
    let char = document.getElementById("char");
    char.innerHTML = "";

    let textbox = document.getElementById("textbox");
    let namebox = document.getElementById("namebox");
    let inputField = document.getElementById("inputField");
    let choiceField = document.getElementById("choiceField");

    namebox.style.display = "none";
    textbox.style.display = "none";
    inputField.style.display = "none";
    choiceField.style.display = "none";
}

function clrdialog() {
    let textbox = document.getElementById("textbox");
    let namebox = document.getElementById("namebox");

    namebox.innerHTML = "";
    textbox.querySelector("p").innerHTML = "";
}


function music(name) {
    if(name === null) {
        musicPlayer.pause();
    } else {
        musicPlayer.pause();
        musicPlayer.src = "./music/"+name;
        musicPlayer.play();
    }
}

function clrInputs() {
    let field = document.getElementById("inputField");
    field.style.display = "none";
}

function input(name, type, placeholder, message) {
    let field = document.getElementById("inputField");
    field.querySelector("p").innerHTML = message;

    field.querySelector("input").type = type;
    field.querySelector("input").name = name;
    field.querySelector("input").id = name;
    field.querySelector("input").placeholder = placeholder;
    field.querySelector("input").onkeydown = (e) => {
        field.querySelector("input").setAttribute("value", field.querySelector("input").value);
        if(e.key === "Enter") {
            inpValue = field.querySelector("input").value;
        }
    }

    field.style.display = "block";

    return field.querySelector("input");
}

function getInput() {
    // let inp = document.getElementById('inputField').querySelector("input");
    if(inpValue) {
        return inpValue;
    } else {
        return undefined;
    }
}


function choice(choices) {
    let host = document.getElementById("choiceField");
    host.innerHTML = "";

    choices.forEach(item=>{
        let p = document.createElement("p");
        p.innerHTML = item;
        p.className = "p-2 text-center bg-light text-black"

        host.appendChild(p);
        p.onclick = () => {
            host.style.display = "none";

            var event = new CustomEvent("choice", {
                "detail": { "result": p.innerHTML }
            });

            var ev = new KeyboardEvent("keydown", {
                key: "Enter"
            });
            
            host.dispatchEvent(event);
            document.dispatchEvent(ev);
        }
    });

    host.style.display = "grid";

    return host;
}

function sfx(name) {
    if(name === null) {
        sfxPlayer.pause();
    } else {
        sfxPlayer.pause();
        sfxPlayer.src = "./sfx/"+name;
        sfxPlayer.play();
        sfxPlayer.onended = () => {
            sfxPlayer.pause();
        }
    }
}


exports.map = map;
exports.next = next;
exports.char = char;
exports.dialog = dialog;
exports.clrscr = clrscr;
exports.clrdialog = clrdialog;
exports.initSay = initSay;
exports.music = music;
exports.input = input;
exports.getInput = getInput;
exports.choice = choice;
exports.sfx = sfx;