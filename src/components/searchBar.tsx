import { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const StyledInput = styled.input`
    color: #011627;
    background-color: #FDFFFC;
    width: 80%;
    height: 30px;
    border-radius: 5px;
    margin-top: 15px;
`
interface Props {
    setMoviesList: React.Dispatch<React.SetStateAction<any>>,
    setError: React.Dispatch<React.SetStateAction<any>>,
    setSearchQuery: React.Dispatch<React.SetStateAction<any>>,
    searchQuery: string,
}


export default function SearchBar({ setMoviesList, setError, setSearchQuery, searchQuery }: Props) {


    useEffect(() => {
        const fetchData = async () => {
            if (searchQuery.length > 0) {
                try {
                    const res = await axios.get(`https://api.themoviedb.org/3/search/movie?query=${searchQuery}&api_key=307988eac06dc5f8a31e00a98636b0d9`);
                    setMoviesList(res.data.results);
                }
                catch (error) {
                    //console.error(error);
                    setError(true);
                }
            }
        }
        console.log('toto');

        fetchData();
    }, [searchQuery])

    return (
        <>
            <StyledInput placeholder="Cherchez un titre de film" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
        </>
    )
}