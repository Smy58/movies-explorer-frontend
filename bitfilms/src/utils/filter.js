export function handleFilter(moviesList, value) {
    let result = [];
    moviesList.forEach((movie) => {
      if (movie.nameRU.toLowerCase().includes(value.toLowerCase()))
        result.push(movie);
    });
    return result;
}

export function handleIdFilter(moviesList, id) {
    return moviesList.filter((movie) => movie._id !== id);
}