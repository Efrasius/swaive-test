import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { MovieInterface, GenreInterface } from '../types/types';

const StyledCard = styled.div`
    background-color: rgba(0, 0, 0, 0.3);
    width: 150px;
    height: 250px;
    margin-top: 15px;
    border-radius: 5px;
    overflow: hidden;
`

const StyleCardDetails = styled(StyledCard)`
    font-size: 0.7em;
    overflow: scroll;
    text-align: left;
`

const StyledTitle = styled.p`
    height: 20%;
    margin: 0px;
`

const StyledImg = styled.img`
    width: 100%;
    height: 80%;
    object-fit: cover;
`



interface movieCardProps {
    movie: MovieInterface,
    genres: Array<GenreInterface> | null
}

export default function movieCard({movie, genres} : movieCardProps) {
    const [showDetails, setShowDetails] = useState<boolean>(false);
    const [movieGenres, setMovieGenres] = useState<Array<GenreInterface>>();

    useEffect(() => {
        if (genres) {
            setMovieGenres(genres.filter((genre) => movie.genre_ids.includes(genre.id)));
        }
    }, []);


    if (showDetails) {
        return(
            <>
                <StyleCardDetails onClick={() => setShowDetails(!showDetails)}>
                    <StyledTitle>{movie.title}</StyledTitle>
                    <p>Sorti le : {movie.release_date}</p>
                    <p>{movie.overview}</p>
                    <div>Genres :
                        <ul>
                            {movieGenres?movieGenres.map((val, key) => {
                                return(<div key={key}>{val.name}</div>)
                            }):''}
                        </ul>
                    </div>
                    
                </StyleCardDetails>
            </>
        )
    }

    return(
        <>
            <StyledCard onClick={() => setShowDetails(!showDetails)}>
                <StyledTitle>{movie.title}</StyledTitle>
                <StyledImg src={'https://image.tmdb.org/t/p/w500/' + movie.poster_path} />
            </StyledCard>
        </>
    )
}