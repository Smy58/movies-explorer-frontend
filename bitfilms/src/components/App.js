import React from 'react';
import Footer from './Footer';
import Header from './Header';
import Main from './Main';
import Movies from './Movies';
import Profile from './Profile';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import InfoTooltip from './InfoTooltip';

import apiMovies from '../utils/MoviesApi';

import * as auth from '../utils/auth';
import { patchUserInfo } from '../utils/MainApi';
import { handleFilter, handleIdFilter } from '../utils/filter';

import { CurrentUserContext } from '../contexts/CurrentUserContext';

import { Route, Switch, useHistory, useLocation } from 'react-router-dom';
import SavedMovies from './SavedMovies';
import Login from './Login';

function App() {
  const [isMenuOpen, setMenuOpen] = React.useState(false);
  const [loggedIn, setLoggedIn] = React.useState(true);
  const [currentUser, setCurrentUser] = React.useState({name:""});
  const [isRegistered, setRegistered] = React.useState(false);
  const [isInfoTooltip, setInfoTooltip] = React.useState(false);

  const [moviesNumber, setMoviesNumber] = React.useState(null);
  const [downloadMovies, setDownloadMovies] = React.useState(null);
  const [currentCount, setCurrenCount] = React.useState(0);

  const [isHiddenButton, setHiddenButton] = React.useState(true);

  const [shortMovieToggle, setShortMovieToggle] = React.useState(false);
  const [shortMovie, setShortMovie] = React.useState([]);
  const [shortSavedMovie, setShortSavedMovie] = React.useState([]);


  const [movies, setMovies] = React.useState([]);
  const [moviesList, setMoviesList] = React.useState([]);
  const [savedMovies, setSavedMovies] = React.useState([]);

  const history = useHistory();
  const location = useLocation();

  React.useEffect(() => {

    function handleTokenCheck(){
      if (localStorage.getItem('token')){
        const token = localStorage.getItem('token');
        console.log(token);
        // проверяем токен пользователя
        auth.checkToken(token).then((res) => {
          console.log(res.data);
          setCurrentUser(res);
          console.log(currentUser)
          if (res.data){
            //console.log(res.data.email);
            // если есть цель, добавляем её в стейт
            //console.log(loggedIn + " 1");
            handleLogin();
            goToMainPage();

          }
          //console.log(loggedIn + " 3");
        }); 
      }
    }

    handleTokenCheck();
    
  }, [loggedIn]);

  function closeAllPopups(e) {
    setInfoTooltip(false);
  }

  function handleRegistered(reg){
    console.log(reg);
    setRegistered(reg);
  }

  function handleMenuClick(e) {
    setMenuOpen(!isMenuOpen);
  }

  function handleLogin (){
    setLoggedIn(true);
  }
  function handleLogout (){
    setLoggedIn(false);
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('movies');
    localStorage.removeItem('savedMovies');

    history.push('/');
  }

  function goToMainPage(){
    if(history.location.pathname === "/"){
      history.push('/movies');
    }
  }

  function handleInfoTooltip(e){
    setInfoTooltip(!isInfoTooltip);
  }

  function toggleLike(items, likeFilms, boolean) {
    const elements = [...items];
    elements.map((item) => {
      if (item.id === likeFilms.id || item.id === likeFilms.movieId) {
        return (item.like = boolean);
      }
    });
    localStorage.setItem("movies", JSON.stringify(elements));
    if (shortMovieToggle) {
      const movieSearch = JSON.parse(localStorage.getItem("shortVideos"));
      const shortvideosSearch = [...movieSearch];
      shortvideosSearch.map((item) => {
        if (item.id === likeFilms.id || item.id === likeFilms.movieId) {
          return (item.like = boolean);
        }
      });
      localStorage.setItem("shortVideos", JSON.stringify(shortvideosSearch));
      setShortMovie(shortvideosSearch);
    } else {
      setMovies(elements);
    }
  }

  function addSaveMovie(cardLike) {
    apiMovies.savedMovies(cardLike)
      .then((res) => {
        let saveMovieSearch = [];

        if (localStorage.getItem("savedMovies") !== null) {
          saveMovieSearch = JSON.parse(localStorage.getItem("savedMovies")).data;
        }
        
        const newSaveMovies = [...saveMovieSearch, res.data];

        setSavedMovies(newSaveMovies);

        let na = { data: newSaveMovies };
        
        localStorage.setItem("savedMovies", JSON.stringify(na));
        
        toggleLike(movies, cardLike, true);
      })
      .catch((err) => {
        console.log(`Ошибка при сохранении фильма ${err}`);
      });
  }

  function deleteMovie(cardLike) {
    const saveMovieSearch = JSON.parse(localStorage.getItem("savedMovies")).data;
    const saveFilmsSearch = [...saveMovieSearch];

    saveFilmsSearch.map((card) => {
      if (card.movieId === cardLike.movieId || card.movieId === cardLike.id) {
        apiMovies.deleteSavedMovie(card.movieId)
          .then((res) => {
            const newSaveMovies = handleIdFilter(
              saveFilmsSearch,
              cardLike._id || card._id
            );
            setSavedMovies(newSaveMovies);
            localStorage.setItem("savedMovies", JSON.stringify({data: newSaveMovies}));
            toggleLike(movies, cardLike, false);
          })
          .catch((err) => {
            console.log(`Ошибка при сохранении фильма ${err}`);
          });
      }
    });
  }

  function handleLikeClick(cardLike) {

    if (history.location.pathname === "/saved-movies") {
      deleteMovie(cardLike);
    } else {
      if (cardLike.like) {
        deleteMovie(cardLike);
      } else {
        addSaveMovie(cardLike);
      }
    }
  }

  function addLikeActive(cards, saveFilmsCard) {
    if (
      cards !== null &&
      cards !== undefined &&
      saveFilmsCard !== null &&
      saveFilmsCard !== undefined
    ) {
      const newFilms = cards;
      newFilms.map((item) => {
        saveFilmsCard.map((i) => {
          if (item.id === i.movieId) {
            return (item.like = true);
          }
        });
      });
      setMovies(newFilms);
      localStorage.setItem("movies", JSON.stringify(newFilms));
    }
    return;
  }

  function handleFilter(moviesList, value) {
    let result = [];
    moviesList.forEach((item) => {
      if (item.nameRU.toLowerCase().includes(value.toLowerCase()))
        result.push(item);
    });
    return result;
  }

  function handleFilterSearchSavedMovie(query) {
    setSavedMovies(handleFilter(savedMovies, query));
  }

  const handleFilterSearchMovie = (query) => {
    apiMovies.getInitialCards()
      .then((res) => {
        const filterMovies = handleFilter(res, query);
        addLikeActive(filterMovies, savedMovies);
      })
      .catch((err) => {
        console.log(`Ошибка при загрузке карточек: ${err}`);
      });
  };

  function handleShortVideosFilter (movies) {
    let result = [];
    movies.forEach(movie => {
      if (movie.duration <= 40) {
        result.push(movie);
      }
    })
    return result
  }

  function shortVideos() {
    setShortMovieToggle(true);
    const movieSearch = JSON.parse(localStorage.getItem("movies"));
    const videos = handleShortVideosFilter(movieSearch);
    localStorage.setItem("shortVideos", JSON.stringify(videos));
    setShortMovie(videos);
  }

  function notShortVideos() {
    setShortMovieToggle(false);
    const movieSearch = JSON.parse(localStorage.getItem("movies"));
    movieSearch !== null ? setMovies(movieSearch) : setMovies([]);
  }


  function shortSaveVideos() {
    setShortMovieToggle(true);
    const movieSearch = handleShortVideosFilter(savedMovies);
    setShortSavedMovie(movieSearch);
  }

  function notShortSaveVideos() {
    setShortMovieToggle(false);
    const saveMovieSearch = JSON.parse(localStorage.getItem("savedMovies")).data;
    // console.log(saveMovieSearch);
    saveMovieSearch !== null ? setSavedMovies(saveMovieSearch) : setMovies([]);
  }


  function handleResize() {
    const windowSize = window.innerWidth;
    if (windowSize >= 1215) {
      setMoviesNumber(12);
      setDownloadMovies(3);
    } else if (windowSize < 1280 && windowSize >= 768) {
      setMoviesNumber(8);
      setDownloadMovies(2);
    } else if (windowSize < 768) {
      setMoviesNumber(5);
      setDownloadMovies(5);
    }
  }

  function uploadingСards() {
    if (movies.length > moviesList.length) {
      const count = currentCount + downloadMovies;
      const additionalCards = movies.slice(currentCount, count);
      setMoviesList([...moviesList, ...additionalCards]);
      setCurrenCount(count);
    }
  }

  function editProfile(name, email) {
    patchUserInfo({ name, email })
      .then((res) => {
        setCurrentUser(res);
      });
  }

  React.useEffect(() => {
    if(loggedIn){
      apiMovies.getInitialCards()
        .then((data) => {
          localStorage.setItem("movies", JSON.stringify(data));
        })
        .catch((err) => {
          console.log(err);
      });

      apiMovies.getSaveMovies()
        .then((res) => {
          localStorage.setItem("savedMovies", JSON.stringify(res));
          //console.log(res);
          //console.log(JSON.parse(localStorage.getItem("savedMovies")));
          const saveMovieSearch = JSON.parse(localStorage.getItem("savedMovies")).data;
          saveMovieSearch !== null
            ? setSavedMovies(saveMovieSearch)
            : setSavedMovies([]);

          const movieSearch = JSON.parse(localStorage.getItem("movies"));

          addLikeActive(movieSearch, saveMovieSearch);

        })
        .catch((err) => {
          setSavedMovies([]);
          console.log(`Ошибка при загрузке сохраненных фильмов ${err}`);
      });
      handleResize();
    }
  }, [loggedIn, location]);

  React.useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  React.useEffect(() => {
    setMovies(shortMovie);
    setSavedMovies(shortSavedMovie);
  }, [shortMovie, shortSavedMovie]);

  React.useEffect(() => {
    // console.log(movies.slice(0, moviesNumber));
    setMoviesList(movies.slice(0, moviesNumber));
    setCurrenCount(moviesNumber);
  }, [movies, moviesNumber]);

  React.useEffect(() => {
    movies.length > moviesList.length
      ? setHiddenButton(false)
      : setHiddenButton(true);
  }, [movies, moviesList]);

  React.useEffect(() => {
    setShortMovieToggle(false);
  }, [location]);

  

  React.useEffect(() => {

  }, [toggleLike]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Switch>
          <ProtectedRoute exact path="/" loggedIn={loggedIn} 
          render={() =>(
            <>
              <Main />
              <Footer />
            </>
          )} />
          
          <ProtectedRoute path="/movies" loggedIn={loggedIn}
          render={() =>(
            <>
              <Header isOpen={isMenuOpen} onMenu={handleMenuClick}/>
              <Movies movies={moviesList} 
                      onLikeClick={handleLikeClick} 
                      handleRequest={handleFilterSearchMovie} 
                      shortMovieToggle={shortMovieToggle} 
                      shortVideos={shortVideos} 
                      notShortVideos={notShortVideos} 
                      uploadingСards={uploadingСards}
                      isHiddenButton={isHiddenButton}/>
              <Footer/>
            </>
          )} />

          <ProtectedRoute path="/saved-movies" loggedIn={loggedIn} 
          render={() =>(
            <>
              <Header isOpen={isMenuOpen}/>
              <SavedMovies movies={savedMovies} onLikeClick={handleLikeClick} handleRequest={handleFilterSearchSavedMovie} shortMovieToggle={shortMovieToggle} shortVideos={shortSaveVideos} notShortVideos={notShortSaveVideos}/>
              <Footer/>
            </>
          )} />

          <ProtectedRoute path="/profile" loggedIn={loggedIn}
          render={() =>(
            <>
              <Header/>
              <Profile exit={handleLogout} editProfile={editProfile}/>
            </>
          )} />

          <Route path="/signin">
            <Login handleLogin={handleLogin} onRegistered={handleRegistered} onInfoTooltip={handleInfoTooltip} history={history}/>
          </Route>
          
          <Route path="/signup">
            <Register onInfoTooltip={handleInfoTooltip} onRegistered={handleRegistered} history={history}/>
          </Route>

        </Switch>

        <InfoTooltip isRegistered={isRegistered} isOpen={isInfoTooltip} onClose={closeAllPopups} ></InfoTooltip>

      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
