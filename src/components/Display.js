import React from 'react';

class Display extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            movies: []
        }
        this.getTopMovies();
    }

    getTopMovies() {
        fetch('http://localhost:3000/movie', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then((response) => response.json())
            .then((data) => {
                this.setState({
                    movies: data
                })
            })
    }
    render() {
        let movies = this.state.movies;
        const listItems = movies.map((movie) =>
            <li class="list-group-item">{movie.username}</li>
        );
        return (
            <div>
                <ul class="list-group">{listItems}</ul>
            </div>
        );
    }
}

export default Display;