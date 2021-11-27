

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

    getInitialCards(){
        return fetch(this._baseUrl, this._headersGet)
            .then(res => {
                return res.ok ? res.json() : Promise.reject(`${res.status}`);
            });
    }

    savedMovies(movie) {
        const { country, director, duration, year, description, nameRU, nameEN } = movie;
        console.log(movie);
        const image = `https://api.nomoreparties.co${movie.image.url}`;
        const trailer = movie.trailerLink;
        const thumbnail = `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`;
        const movieId = movie.id;
        return fetch(`http://bitfilms.api.nomoredomains.monster/movies`, {
          method: "POST",
          credentials: "include",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify({
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
          }),
        }).then((res) => {
            return res.ok ? res.json() : Promise.reject(`${res.status}`);
        });
    }

    deleteSavedMovie = (movieId) => {
        return fetch(`http://bitfilms.api.nomoredomains.monster/movies/${movieId}`, {
          method: "DELETE",
          credentials: "include",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }).then((res) => {
            return res.ok ? res.json() : Promise.reject(`${res.status}`);
        });
    };

    getSaveMovies() {
        return fetch(`http://bitfilms.api.nomoredomains.monster/movies`, {
          method: "GET",
          credentials: "include",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }).then((res) => {
            return res.ok ? res.json() : Promise.reject(`${res.status}`);
        });
      }
    
}

const apiMovies = new MoviesApi({
    baseUrl: 'https://api.nomoreparties.co/beatfilm-movies',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }
})

export default apiMovies;
