import { apiUrl, apiMoviesUrl } from '../constants/constants';

class MoviesApi {
    constructor(options ){
        this._options = options;
        this._baseUrl = options.baseUrl;
        this._headers = {headers: options.headers};
        this._headersGet ={
            method: 'GET',
            headers: options.headers
        };
        this._headersPatch ={
            method: 'PATCH',
            headers: options.headers
        };
        this._headersPost ={
            method: 'POST',
            headers: options.headers
        };
        this._headersPut ={
            method: 'PUT',
            headers: options.headers
        };
        this._headersDelete ={
            method: 'DELETE',
            headers: options.headers
        };
    }

    resCheck(res){
        return res.ok ? res.json() : Promise.reject(res);
    }

    getInitialCards(){
        return fetch(this._baseUrl, this._headersGet)
            .then(res => {
                return this.resCheck(res);
            });
    }

    savedMovies(movie) {
        const { country, director, duration, year, description, nameRU, nameEN } = movie;
        console.log(movie);
        const image = `https://api.nomoreparties.co${movie.image.url}`;
        const trailer = movie.trailerLink;
        const thumbnail = `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`;
        const movieId = movie.id;

        let head = this._headersPost;
        head.headers.authorization = `Bearer ${localStorage.getItem('token')}`;
        head.body = JSON.stringify({
            country,
            director,
            duration,
            year,
            description,
            image,
            trailer,
            nameRU,
            nameEN,
            thumbnail,
            movieId,
          });

        return fetch(`${apiUrl}/movies`, head )
        .then((res) => {
            return this.resCheck(res);
        });
    }

    deleteSavedMovie = (movieId) => {
        let head = this._headersDelete;
        head.headers.authorization = `Bearer ${localStorage.getItem('token')}`;

        return fetch(`${apiUrl}/movies/${movieId}`, head)
        .then((res) => {
            return this.resCheck(res);
        });
    };

    getSaveMovies() {
        let head = this._headersGet;
        head.headers.authorization = `Bearer ${localStorage.getItem('token')}`;

        return fetch(`${apiUrl}/movies`, head)
        .then((res) => {
            return this.resCheck(res);
        });
      }
    
}

const apiMovies = new MoviesApi({
    baseUrl: apiMoviesUrl,
    credentials: "include",
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    }
})

export default apiMovies;
