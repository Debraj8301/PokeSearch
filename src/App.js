import './App.css';
import { useState, useEffect } from 'react';
import Axios from 'axios';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSearch} from '@fortawesome/free-solid-svg-icons';
function App() {
  const [pokemonName, setPokemonName] = useState(localStorage.getItem('myPokemon'));
  const [pokemonChosen, setPokemonChosen] = useState(false);
  
  const [allPokemonNames, setAllPokemonNames] = useState([]);
  const [reccomendation, setReccomendation] = useState([]);
  const [pokemon, setPokemon] = useState({
    name: "Ash",
    img: "https://sm.ign.com/ign_ap/screenshot/default/ashwins_78um.jpg",
    hp: "-",
    attack: "-",
    defense: "-",
    type: "master of"
  });
  // useEffect(() => {
  //   localStorage.setItem('myPokemon', pokemonName);
  // }, [pokemonName]);
  useEffect(() => {
    // localStorage.setItem('myPokemon', pokemonName);
    const currentpokemonName = localStorage.getItem('myPokemon');
    if(currentpokemonName)
    searchPokemon(currentpokemonName);
    getAllPokemon();
  }, []);
  useEffect(() => {
    const arr = allPokemonNames.filter(e => e.startsWith(pokemonName));
    if(pokemonName)
    if(pokemonName.length >= 2)
    setReccomendation(arr);
  }, [pokemonName]);
  useEffect(() => {
    setPokemonChosen(false);
  }, [pokemonName]);
  const searchPokemon = (name) => {
    localStorage.setItem('myPokemon', name);
    Axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`).then((res) => {
      setPokemon({name: pokemonName, img: res.data.sprites.front_default,
      hp: res.data.stats[0].base_stat,
      attack: res.data.stats[1].base_stat,
      defense: res.data.stats[2].base_stat,
      type: res.data.types[0].type.name})
      // setAllPokemonNames([]);
      setPokemonChosen(true);
      
    }).catch(err => {
      alert("Enter a valid Pokemon Name in small cases");
    })
    
  }

  const getAllPokemon = () => {

    Axios.get(`https://pokeapi.co/api/v2/pokemon/?limit=100}`).then((res) => {
      const names = [];
      res.data.results.map((obj) => {
        names.push(obj.name);
      })
      setAllPokemonNames(names)})
    .catch(err => {
      alert("Enter a valid Pokemon Name in small cases");
    })
  
  };
  console.log(allPokemonNames);
  return (
    <div className="App">
      <div className="Title-section">
      <h1>PokeSearch</h1>
      <div class="container">
   <div class="search-box">
    
      <input type="text" value = {pokemonName} onChange = {(event) => setPokemonName(event.target.value)} class="search-input" placeholder="Search.." />

      <button onClick = {() => searchPokemon(pokemonName)} class="search-button">
        <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
      </button>
      
   </div>
   <div className="reccomendation">
     
       {!pokemonChosen ? reccomendation.map(str => <p className="rec" onClick = {() => setPokemonName(str)} key={str}>{str}</p>) : (<></>)}
      
     </div>
</div>

</div>
    <div id="div2" className="displaySection">
     
          <div id="card">
	<h3>{pokemon.name}</h3>
	<div class="image-crop">
		<img id="avatar" src={pokemon.img} />
	</div>
	<div id="bio">
		<p>It is a {pokemon.type} type pokemon </p>
	</div>
	<div id="stats">
		<div class="col">
			<p class="stat">{!pokemon.attack ? (<>-</>) : pokemon.attack}</p>
			<p class="label">Attack</p>
		</div>
				<div class="col">
			<p class="stat">{!pokemon.hp ? (<>-</>) : pokemon.hp}</p>
			<p class="label">HP</p>
		</div>
				<div class="col">
			<p class="stat">{!pokemon.defense ? (<>-</>) : pokemon.defense}</p>
			<p class="label">Defence</p>
		</div>
	</div>
	
</div>
        
    </div>
      </div>
  );
}

export default App;
