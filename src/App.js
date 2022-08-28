import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MovieList from './components/List';
import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox';
import AddFavourites from './components/Nominatiions';
import RemoveFavourites from './components/removeFavourites';
import Finished from './components/finished'

const App = () => {
	const [movies, setMovies] = useState([]);
	const [searchValue, setSearchValue] = useState('');
	const [favourites, setFavourites] = useState([]);


	const getMovieRequest = async () => {
		const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=263d22d8`;

		const response = await fetch(url);
		const responseJson = await response.json();
		console.log(responseJson)

		if (responseJson.Search) {
			setMovies(responseJson.Search);
		}
	};

	useEffect(() => {
		getMovieRequest(searchValue);
	}, [searchValue]);
	useEffect(() => {
		let movieFavourites = JSON.parse(
			localStorage.getItem('react-movie-app-favourites')
		);
		setFavourites([...new Set(movieFavourites)]);
	}, []);

	const addFavouriteMovie = (movie) => {
		if(favourites.length>=5) return null
		
		for (let fav of favourites) {
			if (fav.imdbID === movie.imdbID) return null
		}

		movie.isFavourite = true
		const newFavouriteList = [...favourites, movie];
		setFavourites([...new Set(newFavouriteList)]);
		saveToLocalStorage([...new Set(newFavouriteList)]);
	};
	const removeFavouriteMovie = (movie) => {
		const newFavouriteList = favourites.filter(
			(favourite) => favourite.imdbID !== movie.imdbID
		);

		setFavourites(newFavouriteList);
		saveToLocalStorage(newFavouriteList);
	};
	const saveToLocalStorage = (items) => {
		localStorage.setItem('react-movie-app-favourites', JSON.stringify(items));
	};

	return (
		<div className='container-fluid movie-app'>

			<div className='row d-flex align-items-center mt-4 mb-4'>
				<MovieListHeading heading='OMDB' />				
				<SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
			</div>
			{favourites.length>=5 && <Finished className='banner' />}
			<div className='row'>
				<MovieList movies={movies} favouriteComponent={AddFavourites} handleFavouritesClick={addFavouriteMovie} className="mx-auto" />
			</div>
			<div className='row d-flex align-items-center mt-4 mb-4'>
				<MovieListHeading heading='Nominations' />
			</div>
			<div className='row'>
				<MovieList movies={favourites} favouriteComponent={RemoveFavourites} handleFavouritesClick={removeFavouriteMovie} />
			</div>
			
		</div>
	);
};

export default App;