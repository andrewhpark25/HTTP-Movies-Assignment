import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import UpdateMovie from "./Movies/UpdateMovie";
import axios from 'axios';

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movieList, setMovieList] = useState([]);

  const [movieCount, setMovieCount] = useState([]);
  const [updateCount, setUpdateCount] = useState([]);

  const getMovieList = () => {
    axios
      .get("http://localhost:5000/api/movies")
      .then(res => {
        setMovieList(res.data);
      })
      .catch(err => console.log(err.response));
  };

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  const updateMovieList = () => {
    setUpdateCount(updateCount + 1);
  }

  const removeFromMovieList = () => {
    setMovieCount(movieCount - 1);
 }

  useEffect(() => {
    getMovieList();
  }, [updateCount, movieCount]);

  
  return (
    <>
      <SavedList list={savedList} />

      <Route exact path="/">
        <MovieList movies={movieList} />
      </Route>

      <Route path="/movies/:id">
        <Movie addToSavedList={addToSavedList} removeFromMovieList={removeFromMovieList} />
      </Route>
      <Route path="/update-movie/:id">
        <UpdateMovie  updateMovieList={updateMovieList} />
      </Route>
    </>
  );
};

export default App;
