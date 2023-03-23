const { storage } = require("./vnjs_modules/storage");
const fs = require("fs");
const packageFile = require("./package.json");

document.getElementById("continueBtn").onclick = () => {
    storage.insert({menu_selection: 'continue'});
}

document.getElementById("newGameBtn").onclick = () => {
    storage.insert({menu_selection: 'new-game'});
}

document.getElementById("exitBtn").onclick = () => {
    window.close();
}

document.onkeydown = (e) => {
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

load();



function load() {
    let audio = document.createElement("audio");
    audio.src = packageFile['bgm'];
    if(audio.src !== null) {
        audio.loop = true;
        audio.play();
    }
    document.getElementById("loadGameBtn").onclick = () => {
        let dialog = document.getElementById("saveDialog");
        dialog.innerHTML = "";

        for(let i=1;i<7;i++) {
            let data = storage.find("slot"+i);
            let li = document.createElement("li");
            let p = document.createElement("p");
            p.innerHTML = "Slot "+i;
            let img = document.createElement("img");
            if(data) {
                var url = storage.find("slot"+i).poster;
                if(url === "Nothing here!") {
                    img.src = "./gui/window_icon.png";
                } else {
                    img.src = url;
                }
            } else {
                img.src = "./gui/window_icon.png";
            }
            img.onclick = () => {
                if(confirm("Would you like to load the game from 'Slot "+i+"' ?")) {
                    let name = storage.find("slot"+i).scene;
                    storage.insert({continue: name});
                    storage.insert({menu_selection: 'continue'});
                    location.href = "./one.html";
                }
            }
            li.appendChild(p);
            li.appendChild(img);
            dialog.appendChild(li);
        }

        dialog.style.display = "grid";

        document.body.onclick = (e) => {
            if(e.target.id !== "saveDialog" && e.target.id !== "loadGameBtn") {
                dialog.style.display = "none";
            }
        }
    }
}