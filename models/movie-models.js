import crypto from "crypto";
import { validateMovie, validateParcialMovie } from "../schemas/movie_schemas.js";
import { readJSON } from "../utils/utils.js"

const movies = readJSON("../movies.json");

class MovieModel {

    static async getAll({ genre }) {
        if (genre) {
            genre = genre.toLowerCase();
            return movies.filter(
                movie => movie.genre.some(g => g.toLowerCase() === genre)
            );
        }
        return movies;
    }

    static async getById({ id }) {
        const movie = movies.find(movie => movie.id === id);
        if (movie) return movie;
    }

    static async create({ input }) {
        const new_movie = {
            id: crypto.randomUUID(),
            ...input
        };
        movies.push(new_movie);
        return new_movie;
    }

    static async delete({ id }) {
        const movieIndex = movies.findIndex(movie => movie.id === id);
        if (movieIndex === -1) return false;
        movies.splice(movieIndex, 1);
        return true;
    }

    static async update({ id, input }) {
        const movieIndex = movies.findIndex(movie => movie.id === id);
        if (movieIndex === -1) {
            return false;
        }
        const updatedMovie = {
            ...movies[movieIndex],
            ...input
        };
        movies[movieIndex] = updatedMovie;
        return updatedMovie;
    }
}

export default MovieModel;

/*

    En JavaScript en las funciones de la clase del modelo, siempre es importante pasar objetos
    en vez de un valor fijo, ya que sera mas facil extender el dia de mañana porque
    a los objetos les puedes agregar propiedades

*/