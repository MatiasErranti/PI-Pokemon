import React,{useState} from 'react'
import {filterName,closeFilter} from '../../Redux/Actions/index'
import { useDispatch, useSelector } from 'react-redux'
import './searchbar.css'

const Searchbar = () => {    

  const [state,setState] = useState({
    name:null,
  })
  const dispatch = useDispatch()
  const filter = useSelector((state)=>state.filter)

  const handleSubmit= (event)=>{
    document.getElementById("myInput").value = ''
    event.preventDefault()
    dispatch(filterName(state.name))
    setState({
        name:null,
        })
  }
    
  const handleChange = (e)=>{
     setState({
     ...state,
     name: e.target.value,
     })
  }
    
  const handleClose = ()=>{
    dispatch(closeFilter())
  }
  const disabled = ()=>{
    if(state.name){return false}
    return true
  }
  

  return (
    <div className='searchBar'>
      <form onSubmit={handleSubmit} id="myForm" className='formsearch'>
        <input onChange={handleChange} placeholder='Insert Pokemon...' type="text" id='myInput'/>
        <input disabled={disabled()} className='search'value='Search'type='submit'/>
        {filter?(<>
            <button onClick={handleClose}  className='close'>Close</button>
        </>) :(<></>)}
      </form>
    </div>
  )
}

export default Searchbar