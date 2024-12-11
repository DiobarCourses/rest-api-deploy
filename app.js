// exports
const express = require("express");
const movies = require("./movies.json");
const crypto = require("crypto");
const cors = require("cors");
const { validateMovie, validateParcialMovie } = require("./schemas/movie_schemas.js");

// setup
const app = express();
const port = process.env.PORT ?? 3000;
app.disable("x-powered-by");
const ACCEPTED_ORIGINS = [
    "http://localhost:8080",
    "http://localhost:59777",
];
const corsOptions = {
    origin: (origin, callback) => {
        if (!origin || ACCEPTED_ORIGINS.includes(origin)) {
            return callback(null, true);
        }
        callback(new Error("Not allowed by CORS"));
    },
    methods: "GET,POST,PUT,PATCH,DELETE",
    allowedHeaders: ["Content-Type", "Authorization"],
    optionsSuccessStatus: 204, 
};

// middlewares
app.use(cors(corsOptions));
app.use(express.json());
app.use((req, res, next) => {
    const origin = req.header("origin");
    if (!ACCEPTED_ORIGINS.includes(origin)) {
        return res.status(403).json({ error: "Not allowed by CORS" });
    }
    next();
});

// Rutas
app.get("/", (req, res) => {
    res.json({ message: "hola mundo" });
});

app.get("/movies", (req, res) => {
    const { genre } = req.query;
    if (genre) {
        const genre_lower = genre.toLowerCase();
        const movies_filter = movies.filter(
            movie => movie.genre.some(g => g.toLowerCase() === genre_lower)
        );
        return res.status(200).json(movies_filter);
    }
    res.status(200).json(movies);
});

app.get("/movies/:id", (req, res) => {
    const { id } = req.params;
    const movie = movies.find(movie => movie.id === id);
    movie ? res.json(movie) : res.status(404).json({ Error: "Error 404: Not Found" });
});

app.post("/movies", (req, res) => {
    const result = validateMovie(req.body);
    if (result.error) {
        return res.status(400).json({ error: JSON.parse(result.error) });
    }
    const new_movie = {
        id: crypto.randomUUID(),
        ...result.data
    };
    movies.push(new_movie);
    return res.status(201).json(new_movie);
});

app.patch("/movies/:id", (req, res) => {
    const { id } = req.params;
    const result = validateParcialMovie(req.body);

    if (result.error) {
        return res.status(400).json({ error: JSON.parse(result.error) });
    }
    const indice = movies.findIndex(movie => movie.id === id);
    if (indice === -1) {
        return res.status(404).json({ error: "Movie not found" });
    }
    const updatedMovie = {
        ...movies[indice],
        ...result.data
    };
    movies[indice] = updatedMovie;
    return res.json(updatedMovie);
});

app.delete("/movies/:id", (req, res) => {
    const { id } = req.params;
    const movieIndex = movies.findIndex(movie => movie.id === id);

    if (movieIndex === -1) {
        return res.status(404).json({ error: "Not found resources" });
    }
    movies.splice(movieIndex, 1);
    return res.json({ message: "Movie deleted" });
});

// Servidor
app.listen(port, () => {
    console.log(`Servidor express escuchando en el puerto: ${port}`);
});
