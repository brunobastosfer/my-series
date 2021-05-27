import React from 'react'
import Header from './components/Header'
import Genres from './components/Genres'
import Home from './components/Home'
import NewGenre from './components/NewGenre'
import EditGenre from './components/EditGenre'
import Series from './components/Series'
import NewSerie from './components/NewSerie'
import SerieInfo from './components/SerieInfo'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/generos' exact component={Genres} />
          <Route path='/generos/novo' exact component={NewGenre} />
          <Route path='/generos/:id' exact component={EditGenre} />
          <Route path='/series' exact component={Series} />
          <Route path='/series/novo' exact component={NewSerie} />
          <Route path='/series/:id' exact component={SerieInfo} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
