
import MovieModel from "../models/movie-models.js";
import { validateMovie, validateParcialMovie } from "../schemas/movie_schemas.js";

class MovieController {
    static async getAll(req, res) {
        // request
        const { genre } = req.query;
        // response
        const movies = await MovieModel.getAll({genre});
        // renderizacion(vista, ej: html, json, xml, react, vuejs, etc)
        res.status(200).json(movies);
    }
    static async getById(req, res) {
        // request
        const { id } = req.params;
        // response
        const movie = await MovieModel.getById({ id });
        // renderizacion(vista, ej: html, json, xml, react, vuejs, etc)
        movie ? res.status(200).json(movie) : res.status(200).json({ message: "Movie not found" });
    }

    static async create(req, res) {
        // request
        const result = validateMovie(req.body);
        if (result.error) {
            return res.status(400).json({ error: JSON.parse(result.error) });
        }
        // response
        const new_movie = MovieModel.create({ input: result.data });
        // renderizacion(vista, ej: html, json, xml, react, vuejs, etc)
        return res.status(201).json(new_movie);
    }

    static async update(req, res) {
        // request
        const { id } = req.params;
        const result = validateParcialMovie(req.body);
        if (result.error) {
            return res.status(400).json({ error: JSON.parse(result.error) });
        }
        // response
        const updatedMovie = await MovieModel.update({ id: id, input: result.data });
        // renderizacion(vista, ej: html, json, xml, react, vuejs, etc)
        updatedMovie
            ? res.json(updatedMovie)
            : res.json({ message: "Movie not found" });
    }

    static async delete(req, res) {
        // request
        const { id } = req.params;
        // response
        const movieDeleted = await MovieModel.delete({ id });
        // renderizacion(vista, ej: html, json, xml, react, vuejs, etc)
        movieDeleted
            ? res.status(200).json({ message: "Movie deleted" }) : res.json({ message: "Movie not found" });
    }
}

export default MovieController;