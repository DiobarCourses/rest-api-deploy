/* exports */
import express from "express";
import moviesRouter from "./routes/movies-route.js";
import corsMiddleware from "./middlewares/cors.js";

/* setup */
const app = express();
const port = process.env.PORT ?? 3001;
app.disable("x-powered-by");

/* middlewares */
app.use(corsMiddleware);
app.use(express.json());
app.use((req, res, next) => {
    // const origin = req.header("origin");
    // if (!ACCEPTED_ORIGINS.includes(origin)) {
    //     return res.status(403).json({ error: "Not allowed by CORS" });
    // }
    next();
});


/* Rutas */

/*
    Cuando mi aplicacion acceda a /movies carga todas las rutas de moviesRoutes, y si dentro de esa
    ruta realiza un verbo http, redirigelo al verbo correspondiente en
    moviesRoutes
*/

app.use("/movies", moviesRouter);

/* Servidor */
app.listen(port, () => {
    console.log(`Servidor express escuchando en el puerto: http://localhost:${port}`);
});
