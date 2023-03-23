const { start } = require("./base");
const { backArray } = require("./vnjs_modules/flow");
const { clrdialog, initSay } = require("./vnjs_modules/modules");
const { storage } = require("./vnjs_modules/storage");
const domtoimage = require("./vnjs_modules/dom-to-image");
const fs = require("fs");

if(start) {
    exec(start);
    initSay();
}

function exec(scene) {
    clrdialog();
    backArray.push(scene);
    scene();
    saveAs(scene);
    load();
}

function saveAs(scene) {
    document.getElementById("saveGameBtn").onclick = () => {
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
                if(confirm("Would you like to overwrite the 'Slot "+i+"' data?")) {
                    domtoimage.toJpeg(document.getElementById('main'), { quality: 1, width: window.innerWidth, height: window.innerHeight })
                        .then(function (dataUrl) {
                            switch(i) {
                                case 1: storage.insert({slot1: {scene: scene, poster: dataUrl}});
                                        document.getElementById("saveGameBtn").click();
                                        break;
                                case 2: storage.insert({slot2: {scene: scene, poster: dataUrl}});
                                        document.getElementById("saveGameBtn").click();
                                        break;
                                case 3: storage.insert({slot3: {scene: scene, poster: dataUrl}});
                                        document.getElementById("saveGameBtn").click();
                                        break;
                                case 4: storage.insert({slot4: {scene: scene, poster: dataUrl}});
                                        document.getElementById("saveGameBtn").click();
                                        break;
                                case 5: storage.insert({slot5: {scene: scene, poster: dataUrl}});
                                        document.getElementById("saveGameBtn").click();
                                        break;
                                case 6: storage.insert({slot6: {scene: scene, poster: dataUrl}});
                                        document.getElementById("saveGameBtn").click();
                                        break;
                            }
                        });
                }
            }
            li.appendChild(p);
            li.appendChild(img);
            dialog.appendChild(li);
        }

        dialog.style.display = "grid";

        document.body.onclick = (e) => {
            if(e.target.id !== "saveDialog" && e.target.id !== "saveGameBtn") {
                dialog.style.display = "none";
            }
        }
    }
}


function load() {
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
                    location.reload();
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