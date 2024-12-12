/* Importacion */
import { Router } from "express";
import MovieController from "../controllers/movie-controller.js";

/* inicializacion de objetos */
const moviesRouter = Router();
 
/* Enrutado de las  */
// reciben un callback, por lo tanto no debemos ejecutar la funcion, ej: NO geAll(), SI getAll
moviesRouter.get("/", MovieController.getAll);
moviesRouter.get("/:id", MovieController.getById);
moviesRouter.post("/",  MovieController.create);
moviesRouter.patch("/:id", MovieController.update);
moviesRouter.delete("/:id", MovieController.delete);

/* exportacion */
export default moviesRouter;