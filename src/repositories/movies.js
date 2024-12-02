const pool = require("../../config/database");

exports.getAll = async () => {
  const result = await pool.query("SELECT * FROM movies");
  return result.rows;
};

exports.getById = async (id) => {
  const result = await pool.query("SELECT * FROM movies WHERE id = $1", [id]);
  return result.rows[0];
};

exports.create = async (movie) => {
  const {
    title,
    description,
    duration,
    genre,
    rating,
    tittleOriginal,
    director,
    distributor,
    castmovie,
    country_of_origin,
    image_url,
    audio_format,
  } = movie;
  const result = await pool.query(
    "INSERT INTO movies (title, description, duration, genre, rating, tittleOriginal, director, distributor, castmovie, country_of_origin, image_url, audio_format) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *",
    [
      title,
      description,
      duration,
      genre,
      rating,
      tittleOriginal,
      director,
      distributor,
      castmovie,
      country_of_origin,
      image_url,
      audio_format,
    ]
  );
  return result.rows[0];
};

exports.update = async (id, movie) => {
  const { title, description, duration, genre, rating, release_date } = movie;
  const result = await pool.query(
    "UPDATE movies SET title = $1, description = $2, duration = $3, genre = $4, rating = $5,  WHERE id = $6 RETURNING *",
    [title, description, duration, genre, rating, id]
  );
  return result.rows[0];
};

exports.delete = async (id) => {
  await pool.query("DELETE FROM movies WHERE id = $1", [id]);
};
