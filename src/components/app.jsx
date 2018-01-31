// Default imports
import React, { Component, Fragment } from 'react';

// Components imports
import Header from 'components/header';
import Footer from 'components/footer';
import SearchBar from 'components/searchbar';
import Panel from 'components/panel';

// Global style import
import 'assets/scss/global.scss';

class App extends Component {
  constructor() {
    super();
    this.state = {
      search: null,
      heroes: []
    };

    // API
    const { api: { key, protocol, domain, endpoints: { characters } } } = app;
    const fetchHeroesURL = `${protocol}${domain}${characters}?nameStartsWith=:search&apikey=${key}`;
    this.fetchHeroesURL = fetchHeroesURL;

    // Binds
    this.searchHeroes = this.searchHeroes.bind(this);
    this.fetchHeroes = this.fetchHeroes.bind(this);
    this.setHeroes = this.setHeroes.bind(this);
    this.hasHeroes = this.hasHeroes.bind(this);
  }

  componentWillMount() {
    const heroName = this.getSearchParam();
    if (heroName) {
      this.searchHeroes(heroName);
    }
  }

  getSearchParam() {
    return window.location.search.replace('?search=', '');
  }

  setHeroes(heroesArray) {
    const heroes = heroesArray.map((hero) => {
      const { name, description, thumbnail: { path, extension } } = hero;
      return ({ name, description, image: `${path}.${extension}` });
    });

    this.setState({
      heroes
    });
  }

  fetchHeroes() {
    const fetchHeroesURL = this.fetchHeroesURL.replace(':search', this.state.search);
    fetch(fetchHeroesURL).then(data => data.json()).then(heroData => heroData.data.results).then(this.setHeroes);
  }

  searchHeroes(search) {
    this.setState({
      search
    }, this.fetchHeroes);
  }

  hasHeroes() {
    return this.state.search && this.state.heroes.length;
  }

  render() {
    return (
      <Fragment>
        <Header />
        <main className="main wrapper">
          <SearchBar />
          {
            this.hasHeroes() ?
            this.state.heroes.map(hero => (
              <Panel
                key={hero.id}
                name={hero.name}
                description={hero.description}
                image={hero.image}
              />
            )) : <p>No heroes matching your search</p>
          }
        </main>
        <Footer />
      </Fragment>
    );
  }
}

export default App;
