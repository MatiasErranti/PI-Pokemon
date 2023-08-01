import React from 'react'
import "./pokemon.css"
import { Link } from 'react-router-dom'


const Pokemon = ({id,name,img,types,className}) => {
  const type =  types && types.map((t)=> t.name[0].toUpperCase() + t.name.slice(1))
  const typea = type && type.join(' & ')

  
  return (
    <div className='container'>
      <div className='div-name'>
        <p className='name'>{name && name[0].toUpperCase().concat(name.slice(1))}</p>
      </div>
      {className?(
        <>
          <Link to={`/detail/${id}`}>
           <img className={className} src={img}  alt={`Imagen de ${name}`} />
          </Link>
          <div className='div-type'>
            {typea} 
          </div> </>
          )
      :(
      <> 
        <img className={className} src={img}  alt={`Imagen de ${name}`} />
        <div className='div-type'>
        {typea} 
        </div> </> 
        )
      }

    </div> 
  )
}




export default Pokemon