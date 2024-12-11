const z = require("zod");

const movieschema = z.object({
    title: z.string({
        invalid_type_error: "Titulo de la pelicula debe ser string",
        required_error: "Titulo de pelicula requerido"
    }),
    year: z.number().int().positive().min(1900).max(2024),
    director: z.string(),
    duration: z.number().int().positive(),
    rate: z.number().min(0).max(10).default(5.5).optional(), // cuando es por defecto, se convierte automaticamente en optional
    poster: z.string().url({
        message: "El poster debe ser una URL válida"
    }).endsWith(".jpg"),
    genre: z.array(z.enum([
        "Action", "Adventure", "Drama", "Crime", "Terror"
    ]), {
        required_error: "El género es obligatorio",
        invalid_type_error: "El género debe ser un array de strings"
    }),
});

function validateMovie(input) {
    return movieschema.safeParse(input);
}

function validateParcialMovie(input) {
    return movieschema.partial().safeParse(input);
}

module.exports = {
    validateMovie,
    validateParcialMovie
};
