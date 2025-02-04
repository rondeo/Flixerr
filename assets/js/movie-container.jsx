import React, {Component} from "react";

import uniqid from "uniqid";

import GenreContainer from "./genre-container";

class MovieContainer extends Component {
    constructor(props) {
        super(props);
    }

    getMovies = () => {
        if (this.props.movies.length === 0 || this.props.movies[0] === undefined) {
            this
                .props
                .loadMovieCategories();
        }
    };

    componentDidUpdate(prevProps, prevState) {
        if (this.props.movies) {
            if(!this.props.movies.length){
                this.getMovies();
            }
        }

        if (prevProps.movies !== this.props.movies) {
            this
                .props
                .setHeader(this.props.movies);
        }
    }

    componentDidMount() {
        this.getMovies();
        this
            .props
            .setHeader(this.props.movies);
    }

    render() {
        let movieGenres = this
            .props
            .movies
            .map((item, i) => {
                if (item) {
                    let genreInfo = {
                        showCollection: false,
                        activeGenre: item.name,
                        genreID: item.genreID,
                        movies: item.movies
                    }

                    return (<GenreContainer
                        toggleGenre={this.props.toggleGenre}
                        openBox={this.props.openBox}
                        genreInfo={genreInfo}
                        key={uniqid()}/>);
                }
            });

        return (
            <div
                className='movie-container'
                style={{
                height: `${ 470 * 12}px'`
            }}>
                {movieGenres}
            </div>
        );
    }
}

export default MovieContainer;
