import React from 'react'
import Pokemon from '../../Components/Pokemon/Pokemon'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useEffect,useState } from 'react'
import './details.css'
import { getOnePokemon, loadingDetails } from '../../Redux/Actions'

const Details = () => {

  const dispatch = useDispatch()
  const { id } = useParams()
  const pokemon = useSelector((state)=> state.onePokemon)
  const loading = useSelector((state)=> state.loadingDetails)

  useEffect(()=>{
    dispatch(loadingDetails(true))
    dispatch(getOnePokemon(id))
  },[id])
  
  let barraHp = null
  let barraAttack = null
  let barraDefense = null
  let barraSpeed = null

  if(pokemon){
    let porcentajeHp = pokemon.hp / 255 * 100
    let porcentajeAttack = pokemon.attack / 255 * 100
    let porcentajeDefense = pokemon.defense / 255 * 100
    let porcentajeSpeed = pokemon.speed / 255 * 100

    barraHp = React.CSSProperties = {"--bar-value": porcentajeHp.toString() + '%'};
    barraAttack = React.CSSProperties = {"--bar-value": porcentajeAttack.toString() + '%'};
    barraDefense = React.CSSProperties = {"--bar-value": porcentajeDefense.toString() + '%'};
    barraSpeed = React.CSSProperties = {"--bar-value": porcentajeSpeed.toString() + '%'};
  }
  

  return (
    
    <div>
      {loading?(<>
      <div className='loading'>
        <img src="https://tenor.com/es/view/pikachu-pokemon-gif-24144543.gif" alt="Loading..." />
        Loading...
      </div> 
      </>)
      :
      (<>
        <div className='container-detail'>
          <div className='container-title-details'>
            <h1 className='details_title'>POKEMON DETAILS</h1>
          </div>
          <div className='container_details'>
            <div>
              <div>
                <img className='details_image'src="https://vignette.wikia.nocookie.net/doblaje/images/c/c2/Ash_Ketchum_BW.png/revision/latest?cb=20161002052941&path-prefix=es" alt="ashe" />
              </div>
            </div>
            <div className='details_info'>
            <Pokemon id={pokemon.id} name={pokemon.name} img={pokemon.img} types={pokemon.types} />
            </div>
            <div className='details_stats'>
              <div>
                <span className='stats_title' >Measures</span>
                <ul className='list'>
                  <li className='item'>Weight: {pokemon.weight}</li>
                  <li className='item'>Height: {pokemon.height}</li>
                </ul>
              </div>
              <div>
                <span className='stats_title' >Stats</span>
                <div className='cont-bars'>
                  <div className='grid'>
                    <div className='bar' style={barraHp} 
                         data-name={`Hp(${pokemon.hp})`} title='HP'></div>
                    <div className='bar' style ={barraAttack}
                         data-name={`Att(${pokemon.attack})`} title='Attack'></div>
                    <div className='bar' style ={barraDefense}
                         data-name={`Def(${pokemon.hp})`} title='Defense'></div>
                    <div className='bar' style ={barraSpeed}
                         data-name={`Speed(${pokemon.hp})`} title='Speed'></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
      {/* <h1>{pokemon.name}</h1>
    </div>
    <div >
      <div> <img src={pokemon.img} alt={`imagen de ${pokemon.name}`} /></div>
      <div>
        <h2>HP: {pokemon.hp}</h2>
        <h2>ATTACK: {pokemon.attack}</h2>
        <h2>DEFENSE: {pokemon.defense}</h2>
        <h2>SPEED: {pokemon.speed}</h2>
        <h2>HEIGHT: {pokemon.height}</h2>
        <h2>WEIGHT: {pokemon.weight}</h2>
        {console.log(pokemon)}     
      </div> */}
        </div>
    </>)}
     
    </div>
    
  )
}

export default Details