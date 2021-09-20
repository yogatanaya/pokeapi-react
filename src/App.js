import React, { Component } from 'react';
class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      perPage: 20,
      pokemons: []
    };
    this.loadMore = this.loadMore.bind(this);
  }

  loadMore() {
    let getUrl = fetch(`https://pokeapi.co/api/v2/pokemon?offset=${this.state.perPage + 20}&limit=20`);

    getUrl.then(response => response.json())
    .then(data => this.setState({
      pokemons: data.results
    }))
  }

  componentDidMount() {
    let apiUrl = fetch('https://pokeapi.co/api/v2/pokemon?offset=20&limit=' + this.state.perPage);
    
    apiUrl.then(response => response.json())
    .then(data => 
      this.setState({
      pokemons: data.results
    })
    )
  }

  render() {
    const { pokemons } = this.state;

    return (<div className="container">
      <h1 className="text-left font-weight-bold"><strong>Pokemon Database</strong></h1>

      <div className="row">
        {pokemons.map((pokemon, idx) => 
          <div className="col-md-4">
            <div className="card border-0 shadow shadow-md mt-2" style={{ 'borderRadius': '40px', height: '360px' }}>

              <div className="text-center">
              <img alt="pokemon" src={`https://img.pokemondb.net/artwork/large/${pokemon.name}.jpg`} className="img-fluid rounded-circle" 
              style={{ width: '50%' }}
              />
              </div>
     

              <div className="card-body" key={idx}>
                <h2 className="card-title text-center"><strong>{pokemon.name}</strong></h2>
              </div>
            </div>
          </div>
        )}
      </div>



      <div className="row justify-content-center p-4">
        <button className="btn btn-md btn-primary"
        onClick={() => this.loadMore()}
        >Show More</button>
      </div>

    </div>)
  }
}

export default App;