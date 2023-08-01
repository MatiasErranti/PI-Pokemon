import React from 'react'
import './pokemons.css'
import Pokemon from '../Pokemon/Pokemon'

const Pokemons = ({pokemons,nameOfClass}) => {
  return (

        <div className={nameOfClass}>
         {pokemons.map((p)=> <Pokemon key= {p.id} id= {p.id}name = {p.name} img = {p.img} types = {p.types} className={'imagen'}/>)}
        </div>
  
  )
}

export default Pokemons
