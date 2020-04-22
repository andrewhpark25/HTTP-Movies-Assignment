import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';
import MovieCard from './MovieCard';

function Movie({ addToSavedList, removeFromMovieList }) {
  const [movie, setMovie] = useState(null);
  const { id } = useParams();
  const { push } = useHistory();

  const fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => setMovie(res.data))
      .catch(err => console.log(err.response));
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };

  const updateMovie = () => {
   push(`/update-movie/${id}`);
  }

  
  const removeMovie = () => {
    axios
    .delete(`http://localhost:5000/api/movies/${id}`)
    .then(response => {
      console.log(response);
      removeFromMovieList();
      push(`/`); 
    })
    .catch(error => {
      console.log("the data was not deleted", error);
    });
  }

  useEffect(() => {
    fetchMovie(id);
  }, [id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  return (
    <div className='save-wrapper'>
      <MovieCard movie={movie} />

      <div className='save-button' onClick={saveMovie}>
        Save
      </div>
      <div className='update-button' onClick={updateMovie}>
        Update
      </div>
      <div className='remove-button' onClick={removeMovie}>
        Remove
      </div>
    </div>
  );
}

export default Movie;
