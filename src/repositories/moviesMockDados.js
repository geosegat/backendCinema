class MovieDatabase {
  constructor() {
    this.movie = [
      {
        id: 1,
        tittle: "Avatar",
        description: "Um épico de ficção científica.",
        duration: 162,
        genre: "Ação",
        rating: "PG-13",
        release_date: "2009-12-18",
      },
      {
        id: 2,
        tittle: "Vingadores",
        description: "Um épico de ficção científica.",
        duration: 152,
        genre: "Ação",
        rating: "PG-13",
        release_date: "2009-12-18",
      },
    ];
    this.currentId = 2;
  }
  getAll() {
    return this.movie;
  }

  getById(id) {
    let movie = this.movie.find((movie) => movie.id === id);
    if (movie === undefined) {
      console.log("Filme nao encontrado2222");
      movie = "Nenhum filme encontrado!";
    }
    return movie || console.log("Filme nao encontrado!");
  }

  create(movie) {
    this.currentId += 1;
    const newMovie = { id: this.currentId, ...movie };
    this.movie.push(newMovie);
    return newMovie;
  }

  delete(id) {
    const movieIndex = this.movie.findIndex((movie) => movie.id === id);
    if (movieIndex === -1) {
      return false;
    }
    this.movie.splice(movieIndex, 1);
    return true;
  }

  update(id, updateMovie) {
    const movieIndex = this.movie.findIndex((movie) => movie.id === id);
    if (movieIndex === -1) {
      return null;
    }
    this.movie[movieIndex] = { ...this.movie[movieIndex], ...updateMovie };
    return this.movie[movieIndex];
  }
}

const movieDB = new MovieDatabase();

module.exports = MovieDatabase;
