const MoviesModel = require("../repositories/movies");

exports.getAllMovies = async (req, res) => {
  try {
    const movies = await MoviesModel.getAll();
    res.status(200).json(movies);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar filmes" });
  }
};

exports.getMovieById = async (req, res) => {
  try {
    const movie = await MoviesModel.getById(req.params.id);
    if (!movie) return res.status(404).json({ error: "Filme não encontrado" });
    res.status(200).json(movie);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar filme" });
  }
};

exports.createMovie = async (req, res) => {
  const { title, description, duration, genre, rating, release_date } =
    req.body;
  try {
    const newMovie = await MoviesModel.create({
      title,
      description,
      duration,
      genre,
      rating,
      release_date,
    });
    res.status(201).json(newMovie);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao criar filme" });
  }
};

exports.updateMovie = async (req, res) => {
  const { title, description, duration, genre, rating, release_date } =
    req.body;
  try {
    const updatedMovie = await MoviesModel.update(req.params.id, {
      title,
      description,
      duration,
      genre,
      rating,
      release_date,
    });
    res.status(200).json(updatedMovie);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao atualizar filme" });
  }
};

exports.deleteMovie = async (req, res) => {
  try {
    await MoviesModel.delete(req.params.id);
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao deletar filme" });
  }
};
