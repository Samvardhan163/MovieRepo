import "./App.css";
import { useEffect, useState } from "react";
import Movielist from "./components/Movielist";
import "bootstrap/dist/css/bootstrap.min.css";
import Search from "./components/Search";
import MovielistHeading from "./components/MovielistHeading";
import AddFavorites from "./components/AddFavorites";
import RemoveFavorites from "./components/RemoveFavorites";
function App() {
  const [movies, setmovies] = useState([]);
  const [searchValue, setsearchValue] = useState("");
  const [favourites, setFavourites] = useState([]);
  const getMovieRequest = async (searchValue) => {
    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=91d90aaa`;

    const response = await fetch(url);
    const responseJSon = await response.json();

    if (responseJSon.Search) {
      setmovies(responseJSon.Search);
    }
  };
  useEffect(() => {
    getMovieRequest(searchValue);
  }, [searchValue]);

  useEffect(() => {
    const movieFavorites = JSON.parse(
      localStorage.getItem("react-movie-app-favorites")
    );
    setFavourites(movieFavorites);
  }, []);
  const AddFavoriteMovies = (movie) => {
    const newFavouriteList = [...favourites, movie];
    setFavourites(newFavouriteList);
    saveToLocalStorage(newFavouriteList);
  };
  const RemoveFavorite = (movie) => {
    const newFavouriteList = favourites.filter(
      (favourite) => favourite.imdbID !== movie.imdbID
    );
    setFavourites(newFavouriteList);
    saveToLocalStorage(newFavouriteList);
  };
  const saveToLocalStorage = (item) => {
    localStorage.setItem("react-movie-app-favorites", JSON.stringify(item));
  };
  return (
    <>
      <div className="container-fluid movie-app">
        <div className="row">
          <MovielistHeading heading={"Movies"}></MovielistHeading>
          <Search searchValue={searchValue} setsearchValue={setsearchValue}>
            {" "}
          </Search>
        </div>
        <div className="row">
          <Movielist
            movies={movies}
            favouriteComponent={AddFavorites}
            handleFavouritesClick={AddFavoriteMovies}
          ></Movielist>
        </div>
        <div className="row">
          <MovielistHeading heading={"Favorites"}></MovielistHeading>
        </div>
        <div className="row">
          <Movielist
            movies={favourites}
            favouriteComponent={RemoveFavorites}
            handleFavouritesClick={RemoveFavorite}
          ></Movielist>
        </div>
      </div>
    </>
  );
}

export default App;
