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
      hero: null
    };

    // API
    const { api: { key, protocol, domain, endpoints: { characters } } } = app;
    const fetchHeroURL = `${protocol}${domain}${characters}?name=:search&apikey=${key}`;
    this.fetchHeroURL = fetchHeroURL;

    // Binds
    this.searchHero = this.searchHero.bind(this);
    this.fetchHero = this.fetchHero.bind(this);
    this.setHero = this.setHero.bind(this);
    this.hasHero = this.hasHero.bind(this);
  }

  componentWillMount() {
    const heroName = this.getSearchParam();
    if (heroName) {
      this.searchHero(heroName);
    }
  }

  getSearchParam() {
    return window.location.search.replace('?search=', '');
  }

  setHero({ name, description, thumbnail: { path, extension } }) {
    const hero = {
      name,
      description,
      image: `${path}.${extension}`
    };

    this.setState({
      hero
    });
  }

  fetchHero() {
    const fetchHeroURL = this.fetchHeroURL.replace(':search', this.state.search);
    fetch(fetchHeroURL).then(data => data.json()).then(heroData => heroData.data.results[0]).then(this.setHero);
  }

  searchHero(search) {
    this.setState({
      search
    }, this.fetchHero);
  }

  hasHero() {
    return this.state.search &&
    this.state.hero &&
    this.state.hero.name;
  }

  render() {
    return (
      <Fragment>
        <Header />
        <main className="main wrapper">
          <SearchBar />
          {
            this.hasHero() &&
            <Panel
              name={this.state.hero.name}
              description={this.state.hero.description}
              image={this.state.hero.image}
            />
          }
        </main>
        <Footer />
      </Fragment>
    );
  }
}

export default App;
