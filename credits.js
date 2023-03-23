const jquery = require("jquery");
const path = require('path')
const file = require("./credits.json");

json = file;

var list = [];

// console.log(json.join("_"));
Object.keys(json).forEach(function(key){
    var item = json[key];
    list.push(key + " - " + item);
});

list.forEach(item=>{
    let li = document.createElement("li");
    li.innerHTML = item;
    li.id = item.split(" - ")[0];
    document.getElementById("list").appendChild(li);
});


let next = document.getElementById("list").firstElementChild;
let req = 0;

setInterval(()=>{
    if(req < 1) {
        if(next === document.getElementById("list").lastElementChild) {
            req = 1;
        }
        let elem = next;
        next = next.nextElementSibling;
        jquery("#"+elem.id).slideUp();
    }
}, 600);