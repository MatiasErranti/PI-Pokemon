import React, {useEffect}from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Pokemons from "../../Components/Pokemons/Pokemons"
import {getPokemons,pokemonsPage,loadingPokemons} from "../../Redux/Actions/index"
import './home.css'
import Searchbar from '../../Components/Searchbar/Searchbar'

const Home = () => {
  const dispatch = useDispatch();
  const pokemons = useSelector((state)=> state.pokemonsPage);
  const pokefilter = useSelector((state)=> state.pokefilter)
  const loading = useSelector((state)=> state.loadingPokemons)
  const filter = useSelector((state)=> state.filter)
  

  const paginate = (event)=>{
    dispatch((pokemonsPage(event.target.name)))
  }

  useEffect(()=>{
    dispatch(loadingPokemons(true))
    dispatch(getPokemons())
  },[])
  
  return (
    <div className='total'>
      <Searchbar/>
    <div className={filter?'div-container-filter':'div-container'}>
      {
        loading ? (<>
      <div className='div-loading'>
        <img className='loading-img'src="https://media.tenor.com/z7Zy8aEZSvsAAAAi/ash-now-loading-dark.gif" alt="Loading..." />
      </div>
        </>)
        :
        (<>
      <Pokemons nameOfClass={filter?'no-div':'div'}pokemons={filter?pokefilter:pokemons}></Pokemons>
      {filter?(<></>):(<>
      <div className='div-buttons'>
        <button onClick={paginate} name='prev' className='left'>⇦</button>
        <button onClick={paginate} name='next'className='right'>⇨</button>
      </div>
      </>)}
        </>)
        }
      
    </div>
    </div>
    
  )
}

export default Home

