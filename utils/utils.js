// En communJS se puede importar archivos JSON directamente
// const moviejson = require("/movies.json");
// Pero en ESModules no se puede aun importar archivos JSON directamente
// La sinxtaxis con assert funciona, pero no es recomendable emplear porque esta obsoleta, y que cambio la sintaxis y nos puede traer errores
// import moviejson from "./movies.json" assert {type: "json"}; // como que tipo de archivo(no JS) debe manejar el archivo NODEJS
// La nueva sintaxis es con "with", que sera la sintaxis definitiva pero de igual forma no es recomendable emplear debido a que esta en desarrollo y su empleacion puede gnerar errores 
// import moviejson from "./movies.json" with {type:json};
// Por lo que las formas mas recomendable de leer un json son dos formas: con modules nativos de node manualmente, o con require de CommunJS

/* modulos nativos*/
// import fs from "node:fs";
// const movies = JSON.parse(fs.readFileSync("./movies.json", "utf-8"));

/* con la funcion require de CommunJS */
// Forma recomendada
import { createRequire } from "node:module";
const require = createRequire(import.meta.url); // se obtiene la direccion del archivo actual

export const readJSON = (path) => require(path);
/*
 Esto es importante conocerlo, por si alguna vez te encuentras en la transicion de commonjs a esmodules
 te encontraras con un monton de estos problemas, y es mas rapida ya que es practicamente nativo que emplear
 file system
 */