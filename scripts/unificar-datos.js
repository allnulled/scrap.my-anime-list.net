const fs = require("fs");
const path = require("path");
const ficheros = [
    "myanimelist.net.1.json",
    "myanimelist.net.2.json",
    "myanimelist.net.3.json",
    "myanimelist.net.4.json",
    "myanimelist.net.5.json",
    "myanimelist.net.6.json",
    "myanimelist.net.7.json",
    "myanimelist.net.8.json",
    "myanimelist.net.9.json",
    "myanimelist.net.10.json",
    "myanimelist.net.11.json"
];
let datos_finales = {};
for(let index = 0; index < ficheros.length; index++) {
    const fichero = ficheros[index];
    const ruta_fichero = path.resolve(__dirname, "..", "datos", fichero);
    const json = require(ruta_fichero);
    delete json._;
    datos_finales = Object.assign(datos_finales, json);
}
const ruta_final = path.resolve(__dirname, "..", "datos", "myanimelist.net.all.json");
const ruta_final_2 = path.resolve(__dirname, "..", "app", "myanimelist.net.all.json");
fs.writeFileSync(ruta_final, JSON.stringify(datos_finales, null, 2), "utf8");
fs.writeFileSync(ruta_final_2, JSON.stringify(datos_finales, null, 2), "utf8");