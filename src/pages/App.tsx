import styled, { createGlobalStyle } from 'styled-components';
import Header from '../components/header';
import SearchBar from '../components/searchBar';
import { useState, useEffect } from 'react';
import axios from 'axios';
import MovieCard from '../components/movieCard';
import { MovieInterface, GenreInterface } from '../types/types';
import './App.css'

const GlobalStyle = createGlobalStyle`
  body {
    place-items: initial;
  }
`;

const StyledGallery = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  flex-wrap: wrap;
`;

function App() {
  const [moviesList, setMoviesList] = useState<Array<MovieInterface> | null>(null);
  const [genres, setGenres] = useState<Array<GenreInterface> | null>(null);
  const [error, setError] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('https://api.themoviedb.org/3/movie/popular?api_key=307988eac06dc5f8a31e00a98636b0d9');
        setMoviesList(res.data.results);

        const resGenres = await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=307988eac06dc5f8a31e00a98636b0d9`);
        setGenres(resGenres.data.genres);
      }
      catch (error) {
        //console.error(error);
        setError(true);
      }
    }


    if (searchQuery.length == 0) {
      fetchData();
    }
  }, [searchQuery])

  if (error) {
    return (
      <div>
        <p>Erreur lors du chargement de la liste de films.</p>
      </div>
    )
  }

  return (
    <>
      <GlobalStyle />
      <Header />
      <SearchBar setMoviesList={setMoviesList} setError={setError} setSearchQuery={setSearchQuery} searchQuery={searchQuery} />
      <StyledGallery>
        {moviesList ? moviesList.map((val) => {
          return (<div key={val.id}><MovieCard movie={val} genres={genres} /></div>)
        }) : ''}
      </StyledGallery>
    </>
  )
}

export default App
