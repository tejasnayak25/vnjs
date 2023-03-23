// const app = require('@electron/remote').app;
const file = require("path").dirname(require('@electron/remote').app.getPath("exe"))+"\\storage.db";
const fs = require("fs");

try {
    if (!fs.existsSync(file)) {
        fs.appendFile(file, '{"platform":"windows"}', (err)=>{throw err;});
    }
  } catch(err) {
    console.error(err)
  }

function getData() {
    var data = fs.readFileSync(file, (data) => {
        return data;
    });
    
    data = data.toString();
    if(data !== "") {
        data = JSON.parse(data);
    }

    return data;
}

function insert(items = null) {
    if(items !== null) {
        let data = getData();
        data[Object.keys(items)[0]] = items[Object.keys(items)[0]];
        if(items[Object.keys(items)[0]].scene) {
            if(items[Object.keys(items)[0]].scene.name) {
                data[Object.keys(items)[0]].scene = items[Object.keys(items)[0]].scene.name;
            }
        }
        console.log(data);
        fs.writeFileSync(file, JSON.stringify(data));
    }
}

function update(items = null) {
    if(items !== null) {
        let data = getData();
        if(data[Object.keys(items)[0]]) {
            data[Object.keys(items)[0]] = items[Object.keys(items)[0]];
            fs.writeFileSync(file, JSON.stringify(data));
            return true;
        } else {
            return false;
        }
    }
}

function remove(items = null) {
    if(items !== null) {
        let data = getData();
        if(data[Object.keys(items)[0]]) {
            delete data[Object.keys(items)[0]];
            fs.writeFileSync(file, JSON.stringify(data));
            return true;
        } else {
            return false;
        }
    }
}

function find(key = null) {
    if(key !== null) {
        let data = getData();
        return data[key];
    }
}

exports.storage = {
    insert: insert,
    update: update,
    remove: remove,
    find: find
}