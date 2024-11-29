const express = require("express");
const MoviesController = require("../controllers/movies");

module.exports = () => {
  const router = express.Router();

  router.get("/", MoviesController.getAllMovies);
  router.get("/:id", MoviesController.getMovieById);
  router.post("/", MoviesController.createMovie);
  router.put("/:id", MoviesController.updateMovie);
  router.delete("/:id", MoviesController.deleteMovie);

  return router;
};
