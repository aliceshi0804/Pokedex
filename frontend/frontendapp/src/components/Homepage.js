import React, { useEffect, useState } from 'react';
import InfiniteScroll from "react-infinite-scroll-component";

import './Homepage.css';
import Card from './card.js'
import getPokemon from '../services/pokeapi'
import Header from './Header'

function Homepage({handleLogged}) {
  const amountOfPoKemons = 1118
  const limit = 50

  let [gridColumnCount, setGridColumnCount] = useState(1) 
  let [pokemons, setPokemons] = useState([])
  let [offset, setOffset] = useState(0)
  let [hasMore, setHasMore] = useState(true)
  

  const fetchMoreData = () => {
    if (pokemons.length >= amountOfPoKemons) {
      setHasMore(false);
      return;
    }

    getPokemon(limit, offset).then(({ results }) => {
      Promise.all(results.map(async data => {
        const response = await fetch(`${data.url}`)
        const pokemon = await response.json()
        return pokemon
      })).then(pokemon => {
        setPokemons([...pokemons, ...pokemon]) 
      })
    })

    setOffset(offset + limit)
  }

  useEffect(()=> {
    fetchMoreData()
  }, [])

  useEffect(() => {
    const grid = document.querySelector('.pokedex')
    const gridComputedStyle = window.getComputedStyle(grid);
    const gridColumn = gridComputedStyle.getPropertyValue("grid-template-columns").split(" ")
    setGridColumnCount(gridColumn.length);
  }, []);

  return (
    
    <div className="container">
    <Header isLogged={handleLogged}/>
    <br></br>
      <InfiniteScroll 
        className="pokedex"
        dataLength={pokemons.length}
        next={fetchMoreData}  
        hasMore={hasMore}
        loader={
        <div style={{
          gridColumn: `span ${gridColumnCount}`,
          justifySelf: 'center',
          padding: '15px'
        }}>
          <div className='loader'></div>
        </div>
        }
      >
        {pokemons.map((pokemon) => (
          <Card
            key={pokemon.id} 
            id={pokemon.id}
            name={pokemon.name}
            types={pokemon.types}
            sprites={pokemon.sprites}
            weight={pokemon.weight}
            height={pokemon.height}
            ability={pokemon.abilities[0].ability.name}
          />
        ))}
      </InfiniteScroll>  
    </div>
  );
}

export default Homepage;
