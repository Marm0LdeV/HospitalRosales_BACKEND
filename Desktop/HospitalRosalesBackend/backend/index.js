import app from "./app.js";
import "./database.js"

//creo la funcion
// que se encarga de ejectutar el servidor

async function main () {
    app.listen (4000);
    console.log(" Server on port 4000");
}

main ();