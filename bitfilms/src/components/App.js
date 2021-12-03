import React from 'react';
import Footer from './Footer';
import Header from './Header';
import Main from './Main';
import Movies from './Movies';
import Profile from './Profile';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import InfoTooltip from './InfoTooltip';
import NotFound from './NotFound';

import apiMovies from '../utils/MoviesApi';
import apiAuth from '../utils/AuthApi';
import apiMain from '../utils/MainApi';
import { handleIdFilter } from '../utils/filter';

import { CurrentUserContext } from '../contexts/CurrentUserContext';

import { Route, Switch, useHistory, useLocation, Redirect } from 'react-router-dom';
import SavedMovies from './SavedMovies';
import Login from './Login';

import {
  MAX_SCREEN,
  MID_SCREEN,
  MIN_SCREEN,
  MAX_MOVIES,
  MID_MOVIES,
  MIN_MOVIES,
  ADD_MAX_MOVIES,
  ADD_MID_MOVIES,
  ADD_MIN_MOVIES,
} from '../constants/constants';

function App() {
  const [isMenuOpen, setMenuOpen] = React.useState(false);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({name:""});
  const [isOK, setOK] = React.useState(false);
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

  const [messageError, setMessageError] = React.useState("");
  const [goodMessage, setGoodMessage] = React.useState("");

  const [isCheckingToken, setIsCheckingToken] = React.useState(true);

  const history = useHistory();
  const location = useLocation();
  const userInfo = React.useContext(CurrentUserContext);

  React.useEffect(() => {

    const token = localStorage.getItem('token');
    // проверяем токен пользователя
    apiAuth.checkToken(token).then((res) => {
      setCurrentUser(res);
      if (res.data){          
        setLoggedIn(true);
        setIsCheckingToken(false);
      } else {
        setIsCheckingToken(false);
      }
    })
    .catch((err) => {
      console.log(`Ошибка при загрузке данных профиля ${err}`);
      setIsCheckingToken(false);
    });

  }, [loggedIn]);

  function closeAllPopups(e) {
    setInfoTooltip(false);
  }

  function handleRegistered(name, email, password){
    apiAuth.register(password, email, name)
      .then((res) => {
        if(!res.error){
          setOK(true);
          apiAuth.authorize(email, password)
              .then((data) => {
                  if (!data.message){
                    setOK(true);
                    setGoodMessage("Вы успешно зарегистрировались!")
                    handleLogin();
                    history.push('/movies');
                  }else{
                    setOK(false);
                    handleInfoTooltip();
                  }
              })
              .catch(err => console.log(err));
        }else{        
          setOK(false);
        }
        handleInfoTooltip();
      })
      .catch((err) => {
        console.log(err);
        setOK(false);
        if(err.status === "409"){
          setMessageError("Ошибка! Пользователь с таким email уже существует");
        } else if (err.status === "400") {
          setMessageError(`Ошибка! Введите корректные данные`);
        } else {
          setMessageError(`Ошибка при регистрации`);
        }
        handleInfoTooltip();
      });
  }

  function handleMenuClick(e) {
    setMenuOpen(!isMenuOpen);
  }

  function handleLogin (){
    setLoggedIn(true);
    console.log(loggedIn);
  }
  function handleLogout (){
    setLoggedIn(false);
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('movies');
    localStorage.removeItem('savedMovies');

    history.push('/');
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
        setOK(false);
        setGoodMessage("Ошибка при сохранении фильма");
        handleInfoTooltip();
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
            setOK(false);
            setGoodMessage("Ошибка при удаления фильма");
            handleInfoTooltip();
            console.log(`Ошибка при удаления фильма ${err}`);
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
    if (result.length === 0) {
      setOK(false);
      setMessageError("Ничего не найдено 0_о");
      handleInfoTooltip();
    }
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
        setOK(false);
        setGoodMessage("Ошибка при загрузке карточек");
        handleInfoTooltip();
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
    if (windowSize >= MID_SCREEN) {
      setMoviesNumber(MAX_MOVIES);
      setDownloadMovies(ADD_MAX_MOVIES);
    } else if (windowSize < MAX_SCREEN && windowSize >= MIN_SCREEN) {
      setMoviesNumber(MID_MOVIES);
      setDownloadMovies(ADD_MID_MOVIES);
    } else if (windowSize < MIN_SCREEN) {
      setMoviesNumber(MIN_MOVIES);
      setDownloadMovies(ADD_MIN_MOVIES);
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
    apiMain.patchUserInfo({ name, email })
      .then((res) => {
        setCurrentUser(res);
        setOK(true);
        setGoodMessage("Данные обновлены");
        handleInfoTooltip();
      })
      .catch((err) => {
        setOK(false);
        setGoodMessage("Ошибка обновления");
        handleInfoTooltip();
        console.log(`Ошибка обновления ${err}`);
      });
  }

  React.useEffect(() => {
    if(loggedIn){
      apiMovies.getInitialCards()
        .then((data) => {
          localStorage.setItem("movies", JSON.stringify(data));
        })
        .catch((err) => {
          setOK(false);
          setGoodMessage("Ошибка обновления карточек");
          handleInfoTooltip();
          console.log(err);
      });

      apiMovies.getSaveMovies()
        .then((res) => {
          let nf = [];

          res.data.map(item => (
            item.owner === currentUser.data._id ? nf = [ ...nf, item] : ""
          ));
          res.data = nf;
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
          setOK(false);
          setGoodMessage("Ошибка при загрузке сохраненных фильмов");
          handleInfoTooltip();
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

  React.useEffect(() => {

  }, [currentUser]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Switch>
          <Route exact path="/">
              <>
                {loggedIn ? (
                  <>
                    <Header isOpen={isMenuOpen} onMenu={handleMenuClick} mainMenu={true} history={history}/>
                    <Main loggedIn={loggedIn}/>
                  </>
                ) : (
                  <Main loggedIn={loggedIn}/>
                )}
                <Footer />
              </>
          </Route>
          
          <ProtectedRoute path="/movies" loggedIn={loggedIn} isCheckingToken={isCheckingToken}
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

          <ProtectedRoute path="/saved-movies" loggedIn={loggedIn} isCheckingToken={isCheckingToken}
          render={() =>(
            <>
              <Header isOpen={isMenuOpen}/>
              <SavedMovies movies={savedMovies}
                           onLikeClick={handleLikeClick}
                           handleRequest={handleFilterSearchSavedMovie}
                           shortMovieToggle={shortMovieToggle}
                           shortVideos={shortSaveVideos}
                           notShortVideos={notShortSaveVideos}/>
              <Footer/>
            </>
          )} />

          <ProtectedRoute path="/profile" loggedIn={loggedIn} isCheckingToken={isCheckingToken}
          render={() =>(
            <>
              <Header/>
              <Profile exit={handleLogout} editProfile={editProfile} history={history}/>
            </>
          )} />

          <Route path="/signin">
            {isCheckingToken ? (
              ""
            ) : loggedIn ? (
              <Redirect to="/movies" />
            ) : (
              <Login handleLogin={handleLogin} onRegistered={handleRegistered} onInfoTooltip={handleInfoTooltip} history={history}/>
            )}
          </Route>
          
          <Route path="/signup">
            {isCheckingToken ? (
              ""
            ) : loggedIn ? (
              <Redirect to="/movies" />
            ) : (
              <Register handleLogin={handleLogin} onInfoTooltip={handleInfoTooltip} onRegistered={handleRegistered} history={history}/>
            )}
          </Route>

          <Route path="*">
            <NotFound loggedIn={loggedIn} history={history}/>
          </Route>

        </Switch>

        <InfoTooltip isOK={isOK} isOpen={isInfoTooltip} onClose={closeAllPopups} message={messageError} goodMessage={goodMessage}></InfoTooltip>

      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
