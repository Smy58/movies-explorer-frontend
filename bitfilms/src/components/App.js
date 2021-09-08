import './App.css';
import React from 'react';
import Footer from './Footer';
import Header from './Header';
import Main from './Main';
import Movies from './Movies';
import MoviesCardList from './MoviesCardList';
import Profile from './Profile';
import Register from './Register';
import SearchForm from './SearchForm';

import { Route, Switch, useHistory, BrowserRouter } from 'react-router-dom';
import SavedMovies from './SavedMovies';
import Login from './Login';

function App() {
  const [isMenuOpen, setMenuOpen] = React.useState(false);

  function handleMenuClick(e) {
    setMenuOpen(!isMenuOpen);
  }

  return (
    <div className="page">
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Main/>
            <Footer/>
          </Route>
          
          <Route path="/movies">
            <Header isOpen={isMenuOpen} onMenu={handleMenuClick}/>
            <Movies/>
            <Footer/>
          </Route>
          
          <Route path="/saved-movies">
            <Header isOpen={isMenuOpen}/>
            <SavedMovies/>
            <Footer/>
          </Route>

          <Route path="/signin">
            <Login/>
          </Route>
          
          <Route path="/signup">
            <Register/>
          </Route>

          <Route path="/profile">
            <Header/>
            <Profile/>
          </Route>

        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
